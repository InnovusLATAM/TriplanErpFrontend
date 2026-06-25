// hooks/dashboard/core/useUser.ts
import useSWR from 'swr';
import { api } from '@/lib/api/client';
import {User, UserResponse} from '@/types/user';

// El fetcher que usará SWR. Llama directamente al cliente de la API.
const userFetcher = async (url: string): Promise<User | null> => {
  const response = await api.get<UserResponse>(url);

  if (response.ok && response.data?.data?.user) {
    return response.data.data.user;
  }
  
  // Si la respuesta no es 'ok' o no hay datos, SWR lo interpretará como un error.
  throw new Error(response.error || 'Error al obtener los datos del usuario.');
};

export function useUser() {
  const { data: user, error, isLoading, mutate } = useSWR<User | null>('/auth/me', userFetcher, {
    // Opciones de SWR
    shouldRetryOnError: false, // No reintentar en caso de error (ej. 401)
    revalidateOnFocus: false, // No recargar datos al enfocar la ventana
  });

  return {
    user,
    isLoading,
    isError: !!error,
    error,
    mutate, // Para refrescar los datos manualmente si es necesario
  };
}
