'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { authService, User } from '@/lib/auth/service'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    setUser: (user: User) => void
    clearUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const checkAuthStatus = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await authService.me()
            if (response.ok && response.data.data.user) {
                setUserState(response.data.data.user)
            } else {
                setUserState(null)
            }
        } catch (error) {
            setUserState(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        checkAuthStatus()
    }, [checkAuthStatus])

    const setUser = (user: User) => {
        setUserState(user)
    }

    const clearUser = () => {
        setUserState(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            setUser,
            clearUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context
}
