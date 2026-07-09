'use client'

import {type FormEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {Dialog} from "@/lib/sweet-alert-dialogs";
import {authService} from "@/lib/auth/service";
import { useParams } from 'next/navigation';

export const useRecover = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const validatorRef = useRef<any>(null);
    const passwordMetersRef = useRef<Record<string, any>>({});
    const params = useParams();
    const token = params.token as string;

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
                    password: {
                        validators: {
                            notEmpty: {
                                message: "La contraseña es obligatoria"
                            }
                        }
                    },

                    confirm_password: {
                        validators: {
                            notEmpty: {
                                message: "Confirme la contraseña"
                            },

                            identical: {
                                compare: () => {
                                    return (
                                        form.querySelector(
                                            '[name="password"]'
                                        ) as HTMLInputElement
                                    ).value;
                                },
                                message: "Las contraseñas no coinciden"
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

            const passwordInput = form.querySelector(
                '[name="password"]'
            ) as HTMLInputElement;

            passwordInput.addEventListener("input", () => {
                validatorRef.current?.revalidateField("confirm_password");
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

                const recoveryId = token;
                const password = (formData.get('password') as string) || '';
                const password2 = (formData.get('confirm_password') as string) || '';

                console.log(password)
                console.log(password2)

                if(!recoveryId){
                    Dialog.error('No se encontró un identificador asignado para su recuperación de contraseña.');
                    return;
                }

                if (validatorRef.current) {
                    const status = await validatorRef.current.validate();
                    if (status !== 'Valid') {
                        return;
                    }
                }

                if(password !== password2){
                    Dialog.error('Las contraseñas no coinciden.');
                    return;
                }

                const response = await authService.recoverPassword(password,recoveryId);
                console.log('===========RESPONSE=============');
                console.log(response)
                if (response.ok && response.data) {
                    Dialog.success(response.data.message || 'Contraseña actualizada con éxito.');
                    router.push('/login');
                } else {
                    Dialog.error(response.error || 'Error al establecer la nueva contraseña');
                }

            } catch (error) {
                console.error('Error en el submit:', error);
                Dialog.error('Ocurrió un error inesperado');
            } finally {
                setIsLoading(false);
            }
        },
        [router,token]
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

    const initPasswordMeter = (elementId: string) => {
        if (passwordMetersRef.current[elementId]) {
            return true;
        }
        const element = document.querySelector(`#${elementId}`);

        if (
            element &&
            typeof window !== "undefined" &&
            (window as any).KTPasswordMeter
        ) {
            try {
                passwordMetersRef.current[elementId] = new (window as any).KTPasswordMeter(element, {
                    minLength: 8,
                    checkUppercase: true,
                    checkLowercase: true,
                    checkDigit: true,
                    checkChar: true,
                    scoreHighlightClass: "active",
                });

                return true;
            } catch (error) {
                console.error("Error al inicializar Password Meter:", error);
            }
        }

        return null;
    };

    useEffect(() => {
        const validationInterval = retryInitialization(initValidation);

        const passwordMeterInterval = retryInitialization(() => initPasswordMeter("password1"));
        const passwordMeterInterval2 = retryInitialization(() => initPasswordMeter("password2"));

        return () => {
            if (validationInterval) clearInterval(validationInterval);
            if (passwordMeterInterval) clearInterval(passwordMeterInterval);
            if (passwordMeterInterval2) clearInterval(passwordMeterInterval2);
        };
    }, []);

    return {
        isLoading,
        handleSubmit,
    }
}
