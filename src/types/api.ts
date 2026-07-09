// types/api.ts
export interface ApiResponse<T = unknown> {
    data: T | null;
    error: string | null;
    message: string | null;
    status: number;
    ok: boolean;
}

export interface RequestConfig extends Omit<RequestInit, 'body'> {
    body?: unknown;
    params?: Record<string, string>;
    timeout?: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    nombres: string;
    email: string;
    password: string;
    confirm_password: string;
    terminos_condiciones: boolean;
    pais: string;
    codigo_registro: string;
    registro_negocio: boolean;
    nombre_negocio: string;
}

export interface AuthUser {
    uuid: string;
    full_name: string;
    email: string;
    company: string | null;
    country: {
        code: string;
        name: string;
    };
    role: string;
    isActive: boolean;
    createdAt: string;
}

// ✅ Actualizado para reflejar la estructura real
export interface LoginData {
    user: AuthUser;
    token: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

export type ActionState = {
    error?: string;
    success?: boolean;
};