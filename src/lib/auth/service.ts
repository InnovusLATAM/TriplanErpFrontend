import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { LoginCredentials, LoginResponse, ApiResponse, User } from '@/types/api';
import Cookies from 'js-cookie';

const TOKEN_COOKIE = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const authService = {
    async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
        const response = await api.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials);

        if (response.ok && response.data?.data?.token) {
            const { token } = response.data.data;
            Cookies.set(TOKEN_COOKIE, token, {
                expires: 7,
                path: '/',
                secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
                sameSite: 'strict',
            });
        }

        return response;
    },

    async register(data: Record<string, unknown>): Promise<ApiResponse<LoginResponse>> {
        const response = await api.post<LoginResponse>(API_ENDPOINTS.auth.register, data);

        if (response.ok && response.data?.data?.token) {
            const { token } = response.data.data;
            Cookies.set(TOKEN_COOKIE, token, {
                expires: 7,
                path: '/',
                secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
                sameSite: 'strict',
            });
        }

        return response;
    },

    async me(): Promise<ApiResponse<{ user: User }>> {
        return await api.get<{ user: User }>(API_ENDPOINTS.auth.me);
    },

    async logout(): Promise<void> {
        try {
            // Notificar al backend sobre el cierre de sesión
            await api.post(API_ENDPOINTS.auth.logout);
        } catch (error) {
            console.error("Error al notificar al backend sobre el logout:", error);
        } finally {
            // Siempre eliminar los datos del cliente
            this.clearAuthData();
        }
    },

    clearAuthData(): void {
        Cookies.remove(TOKEN_COOKIE, { path: '/' });
    },

    getToken(): string | null {
        return Cookies.get(TOKEN_COOKIE) || null;
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};
