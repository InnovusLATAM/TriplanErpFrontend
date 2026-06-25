'use client'


import Link from "next/link";

export default function ForgotPasswordForm() {
    return (
        <div className="w-lg-500px p-10">
            <div
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                id="kt_password_reset_form"
                data-kt-redirect-url="/authentication/layouts/overlay/new-password.html"
            >
                {/*begin::Heading*/}
                <div className="text-center mb-10">
                    {/*begin::Title*/}
                    <h1 className="text-gray-900 fw-bolder mb-3">¿Contraseña olvidada ?</h1>
                    {/*end::Title*/}
                    {/*begin::Link*/}
                    <div className="text-gray-500 fw-semibold fs-6">
                        Ingresa tu correo electrónico para restablecer su contraseña.
                    </div>
                    {/*end::Link*/}
                </div>
                {/*begin::Heading*/}
                {/*begin::Input group=*/}
                <div className="fv-row mb-8 fv-plugins-icon-container">
                    {/*begin::Email*/}
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        autoComplete="off"
                        className="form-control bg-transparent"
                    />
                    {/*end::Email*/}
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                </div>
                {/*begin::Actions*/}
                <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                    <button
                        type="button"
                        id="kt_password_reset_submit"
                        className="btn btn-primary me-4"
                    >
                        {/*begin::Indicator label*/}
                        <span className="indicator-label">Enviar</span>
                        {/*end::Indicator label*/}
                        {/*begin::Indicator progress*/}
                        <span className="indicator-progress">
        Please wait...
        <span className="spinner-border spinner-border-sm align-middle ms-2" />
      </span>
                        {/*end::Indicator progress*/}
                    </button>
                    <Link
                        href="/login"
                        className="btn btn-light"
                    >
                        Cancelar
                    </Link>
                </div>
                {/*end::Actions*/}
            </div>

        </div>

    )
}