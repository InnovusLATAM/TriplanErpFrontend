import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { setCookie, getCookie, deleteCookie, COOKIE_KEYS } from '@/lib/utils/cookies';
import type { AuthUser, AuthResponse } from '@/types/api';

const TOKEN_KEY = COOKIE_KEYS.AUTH_TOKEN;

// Estas funciones son SOLO para usar en Server Components o Server Actions
export async function getServerSession(): Promise<AuthUser | null> {
    const token = await getCookie(TOKEN_KEY);
    if (!token) return null;
    const { data } = await api.get<AuthUser>(API_ENDPOINTS.auth.me);
    return data;
}

export async function createServerSession(authData: AuthResponse) {
    await setCookie(TOKEN_KEY, authData.token, { maxAge: 60 * 60 * 24 });
}

export async function destroyServerSession() {
    await deleteCookie(TOKEN_KEY);
}