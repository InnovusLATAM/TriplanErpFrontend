// hooks/dashboard/clientes/useClientes.ts
import useSWR from 'swr';
import { api } from '@/lib/api/client';
import type { Cliente, ClienteFormData, ClientesResponse, ClienteResponse, PaginationInfo } from '@/types/dashboard/clientes/clientes';

interface UseClientesParams {
    page?: number;
    limit?: number;
    search?: string;
}

// Fetcher para SWR - obtiene lista de clientes con paginación
const clientesFetcher = async (url: string): Promise<ClientesResponse['data']> => {
    const response = await api.get<ClientesResponse>(url);

    if (response.ok && response.data?.success) {
        return response.data.data;
    }

    throw new Error(response.error || 'Error al obtener los clientes');
};

export function useClientes(params: UseClientesParams = {}) {
    const { page = 1, limit = 20, search = '' } = params;

    // Construir query string
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    if (search) {
        queryParams.append('search', search);
    }

    const queryString = queryParams.toString();
    const url = `/clients?${queryString}`;

    const {
        data,
        error,
        isLoading,
        mutate,
    } = useSWR<ClientesResponse['data']>(url, clientesFetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
    });

    // Extraer items y paginación
    console.log("DATA FROM RESPONSE",data)
    const clientes = data?.items || [];
    const pagination = data?.pagination;

    // Crear cliente
    const createCliente = async (formData: ClienteFormData): Promise<ClienteResponse> => {
        const response = await api.post<ClienteResponse>('/clients', formData);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al crear el cliente');
        }

        // Revalidar la lista de clientes
        await mutate();

        return response.data;
    };

    // Actualizar cliente
    const updateCliente = async (id: string, formData: Partial<ClienteFormData>): Promise<ClienteResponse> => {
        const response = await api.put<ClienteResponse>(`/clients/${id}`, formData);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al actualizar el cliente');
        }

        await mutate();

        return response.data;
    };

    // Eliminar cliente
    const deleteCliente = async (id: string): Promise<{ success: boolean; message: string }> => {
        const response = await api.delete<{ success: boolean; message: string }>(`/clients/${id}`);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al eliminar el cliente');
        }

        await mutate();

        return response.data;
    };

    return {
        clientes,
        pagination,
        isLoading,
        isError: !!error,
        error,
        mutate,
        createCliente,
        updateCliente,
        deleteCliente,
    };
}