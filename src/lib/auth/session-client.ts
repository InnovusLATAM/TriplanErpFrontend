import type { AuthUser } from '@/types/api';

export function getClientSession(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
        const data = localStorage.getItem('user-data');
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export function setClientSession(user: AuthUser, token: string) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user-data', JSON.stringify(user));
}

export function clearClientSession() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
}

export function getClientToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth-token');
}