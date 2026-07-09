import {type FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {Dialog} from "@/lib/sweet-alert-dialogs";

export default function NuevaNotaCliente(props: any) {
    const { detalleCliente, mutate, agregarNota } = props;

    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const validatorRef = useRef<any>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const initValidation = () => {
        if (validatorRef.current) {
            return true;
        }
        const form = document.querySelector("#nueva_nota_cliente");

        if (!form) {
            return null;
        }

        if (
            form &&
            typeof window !== "undefined" &&
            (window as any).FormValidation
        ) {
            validatorRef.current = (window as any).FormValidation.formValidation(form, {
                fields: {
                    nota_cliente: {
                        validators: {
                            notEmpty: {
                                message: "La nota es obligatoria"
                            },
                        }
                    }
                },
                plugins: {
                    // Agregamos trigger optimizado para textareas
                    trigger: new (window as any).FormValidation.plugins.Trigger({
                        event: 'change keyup',
                    }),
                    bootstrap5: new (window as any).FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleValidClass: "is-valid-no-icon",
                        eleInvalidClass: "is-invalid-no-icon",
                    })
                }
            });
            return true; // Retornamos true para limpiar el intervalo una vez creado
        }

        return null;
    };

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // 1. Validar ANTES de prender el loader para evitar parpadeos visuales innecesarios
            if (validatorRef.current) {
                const status = await validatorRef.current.validate();
                if (status !== 'Valid') {
                    return; // Si no es válido, salimos limpiamente sin activar loaders
                }
            }

            setIsLoadingForm(true);

            try {
                const form = formRef.current;
                const formData = new FormData(form);

                // Corrección del nombre de la variable
                const notaCliente = (formData.get('nota_cliente') as string) || '';

                // Pasamos la nota al request (ajusta los parámetros según tu backend)
                const response = await agregarNota({
                    text: notaCliente
                });

                console.log('RESPONSE FROM NOTA ------>',response)

                if (response.success && response.data) {
                    // Idealmente reseteas el formulario si fue exitoso
                    form.reset();
                    if (validatorRef.current) validatorRef.current.resetForm(true);

                    // Reemplazado 'Dialog' por lo que uses (ej: Swal, toast, etc.)
                    Dialog.success(response.data.message || 'Nota agregada con éxito');

                } else {
                    Dialog.error(response.error || 'Error al agregar la nota');
                }

            } catch (error) {
                console.error('Error en el submit:', error);
                Dialog.error('Ocurrió un error inesperado');
            } finally {
                setIsLoadingForm(false);
            }
        },
        [detalleCliente, agregarNota, mutate] // Añadidas dependencias correctas para el useCallback
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

    return (
        // Recomiendo usar <form> nativo si 'Form' no provee características especiales de UI
        <form id="nueva_nota_cliente" ref={formRef} onSubmit={handleSubmit}>
            <div className="mt-7">
                <h4 className="text-gray-900 mb-1">Notas</h4>
                <div className="fs-7 text-muted mt-1 fw-semibold">
                    Agregar notas y comentarios sobre este cliente.
                </div>
            </div>

            <div className="card card-flush mt-4">
                <div className="card-body">
                    {/* CORRECCIÓN: Añadida la clase fv-row para que FormValidation inserte el error aquí */}
                    <div className="mb-3 d-flex flex-column fv-row">
                        <label className="form-label fw-bold fs-6">
                            Agregar una nota
                        </label>
                        <textarea
                            className="form-control form-control-solid"
                            name="nota_cliente"
                            rows={3}
                            placeholder="Escribe un comentario aquí..."
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={isLoadingForm} // Deshabilitar mientras procesa
                        >
                            {isLoadingForm ? (
                                <span className="indicator-progress" style={{ display: 'block' }}>
                                    Por favor espere...{" "}
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            ) : (
                                <span className="indicator-label">Agregar</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}