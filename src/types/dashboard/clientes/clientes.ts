// types/cliente.ts

export interface ClientePhone {
    country: {
        code: string;      // 'EC', 'ES', 'MX'
        name: string;      // 'Ecuador', 'España', 'México'
        dialCode: string;  // '+593', '+34', '+52'
    };
    number: string;      // '999999999'
    e164: string;        // '+593999999999'
}


export interface ClienteFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: {
        "country": string,
        "number": string,
        "fullNumber": string
    };
}

export interface Cliente {
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: ClientePhone;
    estado: 'ACTIVO' | 'INACTIVO';
    createdAt: Date;
    updatedAt: Date;
}

// Para la respuesta paginada
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ClientesResponse {
    success: boolean;
    data: {
        items: Cliente[];
        pagination: PaginationInfo;
    };
}

export interface ClienteResponse {
    success: boolean;
    data: Cliente;
    message: string;
}