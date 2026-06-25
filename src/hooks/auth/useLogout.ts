'use client'

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth/service';
import { useAuth } from '@/contexts/auth/auth-context';
import { Dialog } from '@/lib/sweet-alert-dialogs';

export function useLogout() {
    const router = useRouter();
    const { clearUser } = useAuth();

    const logout = useCallback(async (showConfirm = true) => {
        // if (showConfirm) {
        //     const result = await Dialog.confirm(
        //         '¿Estás seguro de que deseas cerrar sesión?',
        //         'Cerrar Sesión'
        //     );
        //     if (!result.isConfirmed) return;
        // }

        try {
            await authService.logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            clearUser();
            authService.clearAuthData(); // Limpia cookies o tokens
            router.push('/login');
        }
    }, [router, clearUser]);

    return { logout };
}
