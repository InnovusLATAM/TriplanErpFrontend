'use client'

import {type FormEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {Dialog} from "@/lib/sweet-alert-dialogs";
import {authService} from "@/lib/auth/service";
import { useAuth } from '@/contexts/auth/auth-context';

export interface RegisterFormData {
    nombres: string;
    email: string;
    password: string;
    confirm_password: string;
    terminos_condiciones: boolean;
    pais: string;
    tipo_cuenta: string;
    codigo_registro?: string;
    nombre_negocio?: string;
}


export type CountryOption = { value: string; label: string };

export const useRegisterForm = () => {
    const router = useRouter()
    const { setUser } = useAuth();
    const [country, setCountry] = useState<CountryOption | null>(null);
    const [tipoCuenta, setTipoCuenta] = useState("0");

    const stepperRef = useRef<any>(null);
    const validatorRef = useRef<any>(null);
    const passwordMetersRef = useRef<Record<string, any>>({});

    const stepFields: Record<number, string[]> = {
        1: ["nombres", "email", "password","confirm_password","terminos_condiciones"],
        2: ["pais", "tipo_cuenta"]
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTipoCuenta(e.target.value);
    };

    const initStepper = () => {
        if (stepperRef.current) {
            return true;
        }

        const element = document.querySelector("#kt_create_account_stepper");

        if (element && typeof window !== 'undefined' && (window as any).KTStepper) {
            try {
                stepperRef.current = new (window as any).KTStepper(element);

                stepperRef.current.on("kt.stepper.next", async () => {
                    const step = stepperRef.current.getCurrentStepIndex();
                    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || [];
                    let isValid = true;

                    if (validatorRef.current) {
                        for (const field of fieldsToValidate) {
                            const status = await validatorRef.current.validateField(field);
                            if (status !== "Valid") {
                                isValid = false;
                            }
                        }
                    }

                    if (isValid) {
                        stepperRef.current.goNext();
                    }
                });

                stepperRef.current.on("kt.stepper.previous", () => {
                    stepperRef.current.goPrevious();
                });

                return true;
            } catch (error) {
                console.error('Error al inicializar stepper:', error);
            }
        }
        return false;
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

    const initValidation = () => {
        if (validatorRef.current) {
            return true;
        }
        const form = document.querySelector("#formulario_registro");

        if (
            form &&
            typeof window !== "undefined" &&
            (window as any).FormValidation
        ) {
            validatorRef.current = (window as any).FormValidation.formValidation(form, {
                fields: {
                    nombres: {
                        validators: {
                            notEmpty: {
                                message: "El nombre es obligatorio"
                            }
                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: "El correo electrónico es obligatorio"
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
                    terminos_condiciones:{
                        validators:{
                            notEmpty:{
                                message:"Debe aceptar los términos y condiciones"
                            }
                        }
                    },
                    pais:{
                        validators:{
                            notEmpty:{
                                message:"Debe seleccionar un país"
                            }
                        }
                    },
                    tipo_cuenta:{
                        validators:{
                            notEmpty:{
                                message:"Debe seleccionar un tipo de cuenta"
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

            const passwordInput = form.querySelector(
                '[name="password"]'
            ) as HTMLInputElement;

            passwordInput.addEventListener("input", () => {
                validatorRef.current?.revalidateField("confirm_password");
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

    function validateForm(data: RegisterFormData): string | null {
        if (!data.nombres.trim()) return 'El nombre es obligatorio';
        if (!data.email.trim()) return 'El correo electrónico es obligatorio';
        if (!data.email.includes('@')) return 'Email inválido';
        if (!data.password) return 'La contraseña es obligatoria';
        if (data.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        if (data.password !== data.confirm_password) return 'Las contraseñas no coinciden';
        if (!data.terminos_condiciones) return 'Debe aceptar los términos y condiciones';
        if (!data.pais) return 'Debe seleccionar un país';
        if (!data.tipo_cuenta) return 'Debe seleccionar un tipo de cuenta';
        if (data.tipo_cuenta === '1' && !data.nombre_negocio?.trim()) {
            return 'El nombre del negocio es obligatorio';
        }
        return null;
    }

    const handleFinish = async () => {
        if (!validatorRef.current) {
            return;
        }

        const status = await validatorRef.current.validate();

        if (status === 'Valid') {
            console.log('Formulario enviado');
            const form = document.getElementById('kt_create_account_form');
            if (form) {
                try {
                    form.requestSubmit();
                } catch (error) {
                    console.error('Error en requestSubmit:', error);
                    (form as HTMLFormElement).submit();
                }
            }
        } else {
            console.log('El formulario contiene errores.');
        }
    };

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);

            const data: RegisterFormData = {
                nombres: (formData.get('nombres') as string) || '',
                email: (formData.get('email') as string) || '',
                password: (formData.get('password') as string) || '',
                confirm_password: (formData.get('confirm_password') as string) || '',
                terminos_condiciones: formData.get('terminos_condiciones') === '1',
                pais: country?.value || '',
                tipo_cuenta: tipoCuenta,
                codigo_registro: (formData.get('codigo_registro') as string) || '',
                nombre_negocio: (formData.get('nombre_negocio') as string) || '',
            };

            if (validatorRef.current) {
                const status = await validatorRef.current.validate();
                if (status !== 'Valid') {
                    Dialog.error('El formulario contiene errores. Revise los campos.');
                    return;
                }
            }

            const error = validateForm(data);
            if (error) {
                Dialog.error(error);
                return;
            }

            const response = await authService.register({
                full_name: data.nombres,
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password,
                terminos_condiciones: data.terminos_condiciones,
                country: data.pais,
                cuenta_negocio: data.tipo_cuenta === "1",
                codigo_registro: data.codigo_registro,
                nombre_negocio: data.nombre_negocio
            });

            if (!response.ok || !response.data?.data?.user) {
                Dialog.error(response.error || 'Error al registrar');
                return;
            }

            // Sincronizar el estado de la aplicación ANTES de redirigir
            setUser(response.data.data.user);

            await Dialog.success('Registro exitoso');
            router.push('/dashboard');
        },
        [country, tipoCuenta, router, setUser]
    );

    useEffect(() => {
        const stepperInterval = retryInitialization(initStepper);
        const passwordMeterInterval = retryInitialization(() => initPasswordMeter("password1"));
        const passwordMeterInterval2 = retryInitialization(() => initPasswordMeter("password2"));
        const validationInterval = retryInitialization(initValidation);

        return () => {
            if (stepperInterval) clearInterval(stepperInterval);
            if (passwordMeterInterval) clearInterval(passwordMeterInterval);
            if (passwordMeterInterval2) clearInterval(passwordMeterInterval2);
            if (validationInterval) clearInterval(validationInterval);
        };
    }, []);

    useEffect(() => {
        if (validatorRef.current) {
            validatorRef.current.revalidateField('pais');
        }
    }, [country]);

    useEffect(() => {
        if (validatorRef.current) {
            let existingFields = Object.keys(validatorRef.current.getFields());
            if (tipoCuenta === '1') {
                validatorRef.current.addField('nombre_negocio', {
                    validators: {
                        notEmpty: {
                            message: 'El nombre del negocio es obligatorio',
                        },
                    },
                });
            } else {
                if(existingFields.includes('nombre_negocio')){
                    validatorRef.current.removeField('nombre_negocio');
                }
            }
        }
    }, [tipoCuenta]);

    return {
        country,
        setCountry,
        tipoCuenta,
        handleChange,
        handleFinish,
        handleSubmit,
    }
}