

import type { Metadata } from 'next'
import './styles/style.bundle.css'
import './styles/plugins.bundle.css'
import './globals.css'

import { AuthProvider } from '@/contexts/auth/auth-context'
import { AuthGuard } from '@/contexts/auth/auth-guard'
import Script from "next/script";

export const metadata: Metadata = {
    title: 'Triplan Solutions - Dashboard',
    description: 'Sistema SaaS con autenticación simulada',
    icons: {
        icon: 'media/logos/favicon/favicon.png',     // Para .ico tradicional
        shortcut: 'media/favicon/logos/favicon.png',
        apple: 'media/logos/favicon/apple-icon.png',  // Para dispositivos Apple
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: 'media/logos/favicon/apple-touch-icon-precomposed.png',
        },
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" data-bs-theme="light">
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" />
            <title>Triplan Solutions</title>
        </head>
        <body className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center">
        <AuthProvider>
            <AuthGuard>
                {children}
            </AuthGuard>
        </AuthProvider>
        <Script
            src="/plugins/global/plugins.bundle.js"
            strategy="afterInteractive"
        />
        <Script
            src="/js/scripts.bundle.js"
            strategy="afterInteractive"
        />
        </body>
        </html>
    )
}