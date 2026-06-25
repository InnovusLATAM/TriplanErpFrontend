// 'use client'
//
// import { useAuth } from '@/contexts/auth/auth-context'
// import { usePathname, useRouter } from 'next/navigation'
// import { useEffect } from 'react'
//
// export function AuthGuard({ children }: { children: React.ReactNode }) {
//     const { isAuthenticated, isLoading } = useAuth()
//     const pathname = usePathname()
//     const router = useRouter()
//
//     useEffect(() => {
//         if (isLoading) return
//
//         const isAuthPage = pathname === '/login'
//         const isDashboardPage = pathname.startsWith('/dashboard')
//
//         if (isAuthenticated && isAuthPage) {
//             router.push('/dashboard')
//         } else if (!isAuthenticated && isDashboardPage) {
//             router.push('/login')
//         }
//     }, [isAuthenticated, isLoading, pathname, router])
//
//     // Mostrar loading mientras se verifica
//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//             </div>
//         )
//     }
//
//     return <>{children}</>
// }