import { cookies } from 'next/headers';

type CookieOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    maxAge?: number;
};

const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
    sameSite: 'lax',
};

export async function setCookie(key: string, value: string, options?: CookieOptions) {
    const store = await cookies();
    store.set(key, value, { ...defaultOptions, ...options });
}

export async function getCookie(key: string) {
    const store = await cookies();
    return store.get(key)?.value ?? null;
}

export async function deleteCookie(key: string) {
    const store = await cookies();
    store.delete(key);
}

// Cookie keys tipadas para evitar strings mágicos
export const COOKIE_KEYS = {
    AUTH_TOKEN: process.env.NEXT_PUBLIC_COOKIE_NAME,
    USER_DATA: 'user-data',
} as const;