'use client'

import {type FormEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {Dialog} from "@/lib/sweet-alert-dialogs";
import {authService} from "@/lib/auth/service";
import {useAuth} from "@/contexts/auth/auth-context";
import {CredentialResponse, useGoogleLogin} from '@react-oauth/google';


export interface LoginFormData {
    email: string;
    password: string;
}

export const useLoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth();
    const validatorRef = useRef<any>(null);

    const initValidation = () => {
        if (validatorRef.current) {
            return true;
        }
        const form = document.querySelector("#formulario_inicio_sesion");

        if (
            form &&
            typeof window !== "undefined" &&
            (window as any).FormValidation
        ) {
            validatorRef.current = (window as any).FormValidation.formValidation(form, {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: "El correo electrónico es obligatorio"
                            },
                            emailAddress: {
                                message: 'El formato del correo no es válido'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "La contraseña es obligatoria"
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new (window as any).FormValidation.plugins.Trigger(),
                    bootstrap5: new (window as any).FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleValidClass: "is-valid-no-icon",
                        eleInvalidClass: "is-invalid-no-icon",
                    })
                }
            });
        }

        return null;
    };

    const retryInitialization = (initializer: () => boolean | null) => {
        if (initializer()) return undefined;

        const interval = setInterval(() => {
            if (initializer()) {
                clearInterval(interval);
            }
        }, 100);

        return interval;
    };

    const handleFinish =  async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validatorRef.current) {
            return;
        }

        const status = await validatorRef.current.validate();

        if (status === 'Valid') {
            const form = document.getElementById('formulario_inicio_sesion');
            if (form) {
                try {
                    form.requestSubmit();
                } catch (error) {
                    console.error('Error en requestSubmit:', error);
                    (form as HTMLFormElement).submit();
                }
            }
        } else {
            Dialog.error('El formulario contiene errores. Revise los campos.');
        }
    };

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                const form = e.currentTarget;
                const formData = new FormData(form);

                const data: LoginFormData = {
                    email: (formData.get('email') as string) || '',
                    password: (formData.get('password') as string) || '',
                };

                if (validatorRef.current) {
                    const status = await validatorRef.current.validate();
                    if (status !== 'Valid') {
                        setIsLoading(false);
                        Dialog.error('El formulario contiene errores. Revise los campos.');
                        return;
                    }
                }

                const response = await authService.login(data);
                console.log('===========RESPONSE=============');
                console.log(response)
                if (response.ok && response.data.data.user) {
                    setUser(response.data.data.user);
                    router.push('/dashboard');
                } else {
                    Dialog.error(response.error || 'Error al Iniciar sesión');
                }

            } catch (error) {
                console.error('Error en el submit:', error);
                Dialog.error('Ocurrió un error inesperado');
            } finally {
                setIsLoading(false);
            }
        },
        [router, setUser]
    );

    // NUEVA FUNCIONALIDAD: Login con Google
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                console.log('REPSONSE FROM GOOGLE',tokenResponse);
                const response = await authService.loginWithGoogle(tokenResponse.credential);
                if (response.ok && response.data.data.user) {
                    setUser(response.data.data.user);
                    router.push('/dashboard');
                } else {
                    Dialog.error(response.error || 'Error al Iniciar sesión con Google');
                }
            } catch (error) {
                console.error('Error en login con Google:', error);
                Dialog.error('Ocurrió un error al iniciar sesión con Google');
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.error('Error de Google Login:', error);
            Dialog.error('Error al autenticar con Google');
        }
    });

    // Login con Google — recibe el ID token (credential) emitido por
    // Google Identity Services y lo envía al backend para autenticar.
    const handleGoogleSuccess = useCallback(async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse?.credential) {
            Dialog.error('Google no devolvió un token de identidad válido');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.loginWithGoogle(credentialResponse.credential);
            if (response.ok && response.data.data.user) {
                setUser(response.data.data.user);
                router.push('/dashboard');
            } else {
                Dialog.error(response.error || 'Error al Iniciar sesión con Google');
            }
        } catch (error) {
            console.error('Error en login con Google:', error);
            Dialog.error('Ocurrió un error al iniciar sesión con Google');
        } finally {
            setIsLoading(false);
        }
    }, [router, setUser]);

    const handleGoogleError = useCallback(() => {
        Dialog.error('Error al autenticar con Google');
    }, []);

    useEffect(() => {
        const validationInterval = retryInitialization(initValidation);

        return () => {
            if (validationInterval) clearInterval(validationInterval);
        };
    }, []);

    return {
        isLoading,
        handleFinish,
        handleSubmit,
        handleGoogleLogin,
        handleGoogleSuccess,
        handleGoogleError
    }
}
