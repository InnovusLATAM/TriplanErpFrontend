// lib/api/client.ts
import type { ApiResponse, RequestConfig } from '@/types/api';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Configuración de cookies
const TOKEN_COOKIE = process.env.NEXT_PUBLIC_COOKIE_NAME;
const COOKIE_OPTIONS = {
    expires: 7, // 7 días
    secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
    sameSite: 'strict' as const,
    path: '/',
};

// Navigation callback
let navigationCallback: ((path: string) => void) | null = null;

export function setNavigationCallback(callback: (path: string) => void) {
    navigationCallback = callback;
}

async function getToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    return Cookies.get(TOKEN_COOKIE) || null;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : null;

    if (!response.ok) {
        const message = (data as any)?.message || `Error ${response.status}`;
        if (response.status === 401) await handleUnauthorized();
        return { data: null, error: message, status: response.status, ok: false };
    }

    return { data, error: null, status: response.status, ok: true };
}

async function handleUnauthorized() {
    if (typeof window !== 'undefined') {
        // Remover cookies
        Cookies.remove(TOKEN_COOKIE, { path: '/' });
        Cookies.remove('user-data', { path: '/' });

        // No redirigir si ya estamos en login
        const currentPath = window.location.pathname;
        if (currentPath.includes("/dashboard")) {
            if (navigationCallback) {
                navigationCallback('/login');
            } else {
                window.location.href = '/login';
            }
        }
    }
}

export async function apiClient<T = unknown>(
    endpoint: string,
    config: RequestConfig = {}
): Promise<ApiResponse<T>> {
    const { body, params, timeout = 10000, ...init } = config;

    try {
        const url = new URL(`${BASE_URL}${endpoint}`);
        if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

        const token = await getToken();
        const headers = new Headers(init.headers);
        headers.set('Content-Type', 'application/json');
        if (token) headers.set('Authorization', `Bearer ${token}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            ...init,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return handleResponse<T>(response);
    } catch (error) {

        console.log('BASE',process.env)

        if (error instanceof Error && error.name === 'AbortError') {
            return { data: null, error: 'Tiempo de espera agotado', status: 408, ok: false };
        }
        return { data: error, error: 'Error de conexión', status: 0, ok: false };
    }
}

// Métodos helper tipados
export const api = {
    get: <T>(endpoint: string, config?: RequestConfig) =>
        apiClient<T>(endpoint, { ...config, method: 'GET' }),
    post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
        apiClient<T>(endpoint, { ...config, method: 'POST', body }),
    put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
        apiClient<T>(endpoint, { ...config, method: 'PUT', body }),
    delete: <T>(endpoint: string, config?: RequestConfig) =>
        apiClient<T>(endpoint, { ...config, method: 'DELETE' }),
};