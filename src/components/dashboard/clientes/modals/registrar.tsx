// components/dashboard/clientes/modals/RegistrarClienteModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { PhoneInput } from '@/components/ui/phone-input';
import { usePhoneInput } from '@/hooks/ui/usePhoneInput';
import { useClientes } from '@/hooks/dashboard/clientes/useClientes';
import type { ClienteFormData } from '@/types/dashboard/clientes/clientes';
import type { PhoneData } from '@/components/ui/phone-input';
import {Dialog} from "@/lib/sweet-alert-dialogs";

interface RegistrarClienteModalProps {
    show: boolean;
    onHide: () => void;
}

interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    [key: string]: string | undefined;
}

export function RegistrarClienteModal({ show, onHide }: RegistrarClienteModalProps) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const { phone, setPhone } = usePhoneInput();
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { createCliente } = useClientes();

    // Reset form cuando se abre/cierra el modal
    useEffect(() => {
        if (!show) {
            const timer = setTimeout(() => {
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                });
                setPhone({
                    countryCode: 'EC',
                    countryPhone: '+593',
                    number: '',
                    fullNumber: '',
                });
                setErrors({});
                setSubmitError(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [show, setPhone]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'El nombre es requerido';
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = 'El apellido es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!phone.number.trim()) {
            newErrors.phone = 'El número de teléfono es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            const clienteData: ClienteFormData = {
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim(),
                email: formData.email.trim(),
                phone: {
                    country: phone.countryCode,    // ✅ '+593'
                    number: phone.number.replace(/\s/g, ''),
                },
            };

            const response = await createCliente(clienteData);

            // ✅ Mostrar mensaje de éxito
            if (Dialog) {
                Dialog.success(response.message || 'Cliente registrado exitosamente');
            }

            onHide();

        } catch (error: any) {
            const errorMessage = error?.message || 'Error al registrar el cliente';

            if (Dialog) {
                Dialog.error(errorMessage);
            }

            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            // Clases adicionales de Metronic que se aplican
            className="fade"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Registrar Nuevo Cliente
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {submitError && (
                    <Alert variant="danger" className="d-flex align-items-center p-3 mb-5">
                        <i className="ki-duotone ki-information-5 fs-2 me-3">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                        </i>
                        <div className="d-flex flex-column">
                            <span>{submitError}</span>
                        </div>
                    </Alert>
                )}

                <Form id="registrarClienteForm" onSubmit={handleSubmit} noValidate>
                    <div className="row mb-6">
                        <Form.Group className="col-md-6 mb-6 mb-md-0">
                            <Form.Label className="required">Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="Juan"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.first_name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.first_name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="col-md-6">
                            <Form.Label className="required">Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Pérez"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.last_name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-6">
                        <Form.Label className="required">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="juan@empresa.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        label="Teléfono"
                        required
                        error={errors.phone}
                        defaultCountry="EC"
                    />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="light"
                    onClick={onHide}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    form="registrarClienteForm"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Registrando...
                        </>
                    ) : (
                        'Registrar Cliente'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}