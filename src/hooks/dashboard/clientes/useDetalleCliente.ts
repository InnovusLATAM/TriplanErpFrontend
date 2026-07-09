// hooks/dashboard/clientes/useClientes.ts
import useSWR from 'swr';
import { api } from '@/lib/api/client';

const clientesFetcher = async (url: string) => {
    const response = await api.get(url);

    if (response.ok && response.data?.success) {
        return response.data.data;
    }

    throw new Error(response.error || 'Error al obtener los clientes');
};

export function useDetalleCliente(params: { idCliente: string }) {

    const { idCliente = ""} = params;

    const {
        data: detalleData,
        error: detalleError,
        isLoading: detalleLoading,
        mutate: mutateDetalle,
    } = useSWR(`/clients/${idCliente}`, clientesFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        dedupingInterval: 2000,
    });

    const {
        data: notasData,
        error: notasError,
        isLoading: notasLoading,
        mutate: mutateNotas,
    } = useSWR(`/clients/${idCliente}/notes`, clientesFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        dedupingInterval: 2000,
    });

    const mutate = async () => {
        await Promise.all([
            mutateDetalle(),
            mutateNotas(),
        ]);
    };

    const agregarNota = async (data: object) => {
        const response = await api.post(`/clients/${idCliente}/notes`, data);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al actualizar el cliente');
        }

        await mutateNotas();

        return response.data;
    };

    const obtenerNota = async (idNota : string) => {
        const response = await api.get(`/clients/${idCliente}/notes/${idNota}`);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al actualizar el cliente');
        }

        await mutateNotas();

        return response.data;
    };

    const actualizarNota = async (idNota : string,data:object) => {
        const response = await api.put(`/clients/${idCliente}/notes/${idNota}`, data);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al actualizar la nota');
        }

        await mutateNotas();

        return response.data;
    };

    const eliminarNota = async (idNota : string) => {
        const response = await api.delete(`/clients/${idCliente}/notes/${idNota}`);

        if (!response.ok || !response.data) {
            throw new Error(response.error || 'Error al eliminar la nota');
        }

        await mutateNotas();

        return response.data;
    };

    return {
        detalleCliente: detalleData ?? {},
        notasCliente: notasData ?? [],

        isLoading: detalleLoading || notasLoading,
        isError: !!detalleError || !!notasError,
        error: detalleError ?? notasError,

        mutate,
        mutateDetalle,
        mutateNotas,

        agregarNota,
        obtenerNota,
        actualizarNota,
        eliminarNota,
    };
}