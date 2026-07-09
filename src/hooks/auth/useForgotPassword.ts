'use client'

import {type FormEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {Dialog} from "@/lib/sweet-alert-dialogs";
import {authService} from "@/lib/auth/service";


export interface ForgotPasswordFormData {
    email: string;
}

export const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const validatorRef = useRef<any>(null);

    const initValidation = () => {
        if (validatorRef.current) {
            return true;
        }
        const form = document.querySelector("#forgot_password_form");

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
                    }
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

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                const form = e.currentTarget;
                const formData = new FormData(form);

                const email = (formData.get('email') as string) || '';

                if (validatorRef.current) {
                    const status = await validatorRef.current.validate();
                    if (status !== 'Valid') {
                        return;
                    }
                }

                const response = await authService.forgotPassword(email);
                console.log('===========RESPONSE=============');
                console.log(response)
                if (response.ok && response.data) {
                    Dialog.success(response.data.message || 'Error al Solicitar la recuperación de contraseña');
                    router.push('/login');
                } else {
                    Dialog.error(response.error || 'Error al Solicitar la recuperación de contraseña');
                }

            } catch (error) {
                console.error('Error en el submit:', error);
                Dialog.error('Ocurrió un error inesperado');
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    const retryInitialization = (initializer: () => boolean | null) => {
        if (initializer()) return undefined;

        const interval = setInterval(() => {
            if (initializer()) {
                clearInterval(interval);
            }
        }, 100);

        return interval;
    };

    useEffect(() => {
        const validationInterval = retryInitialization(initValidation);

        return () => {
            if (validationInterval) clearInterval(validationInterval);
        };
    }, []);

    return {
        isLoading,
        handleSubmit,
    }
}
