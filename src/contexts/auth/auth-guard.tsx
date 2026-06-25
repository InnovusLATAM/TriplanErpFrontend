'use client'

import { useAuth } from '@/contexts/auth/auth-context'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LoadingScreen = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
);

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    const isAuthPage = pathname === '/login'
    const isDashboardPage = pathname.startsWith('/dashboard')

    useEffect(() => {
        if (isLoading) {
            return // Esperar a que termine la carga inicial
        }

        // Redirigir si un usuario autenticado está en la página de login
        if (isAuthenticated && isAuthPage) {
            router.push('/dashboard')
        }

        // Redirigir si un usuario no autenticado intenta acceder a una página protegida
        if (!isAuthenticated && isDashboardPage) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, pathname, router, isAuthPage, isDashboardPage])

    // 1. Mientras se verifica la autenticación, siempre mostrar la pantalla de carga.
    if (isLoading) {
        return <LoadingScreen />;
    }

    // 2. Si no está autenticado e intenta ver el dashboard, mostrar carga mientras se redirige.
    //    Esto previene el "flash" del contenido del dashboard.
    if (!isAuthenticated && isDashboardPage) {
        return <LoadingScreen />;
    }

    // 3. Si está autenticado y está en la página de login, mostrar carga mientras se redirige.
    //    Esto previene el "flash" de la página de login.
    if (isAuthenticated && isAuthPage) {
        return <LoadingScreen />;
    }

    // 4. Si ninguna de las condiciones de redirección se cumple, el usuario está en el lugar correcto.
    //    Renderizar el contenido de la página.
    return <>{children}</>
}
