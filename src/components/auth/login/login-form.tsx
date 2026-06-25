'use client'
import Link from "next/link";
import {useLoginForm} from "@/hooks/auth/useLogin";

export default function LoginForm() {
    const {
        isLoading,
        handleFinish,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className="w-lg-500px p-10" id="formulario_inicio_sesion"   action="javascript:void(0)">
            {/*begin::Form*/}
            <div
                className="form w-100"
                id="kt_sign_in_form"
            >
                {/*begin::Heading*/}
                <div className="text-center mb-11">
                    {/*begin::Title*/}
                    <h1 className="text-gray-900 fw-bolder mb-3">Iniciar Sesión</h1>
                    {/*end::Title*/}
                    {/*begin::Subtitle*/}
                    <div className="text-gray-500 fw-semibold fs-6">
                        Triplan Solutions - Dashboard
                    </div>
                    {/*end::Subtitle=*/}
                </div>
                {/*begin::Heading*/}

                <div className="row g-3 mb-9">
                    {/*begin::Col*/}
                    <div className="col-md-6">
                        {/*begin::Google link-*/}
                        <a
                            href="#"
                            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                        >
                            <img
                                alt="Logo"
                                src="/media/svg/brand-logos/google-icon.svg"
                                className="h-15px me-3"
                            />
                            Iniciar con Google
                        </a>
                        {/*end::Google link-*/}
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-md-6">
                        {/*begin::Google link-*/}
                        <a
                            href="#"
                            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                        >
                            <img
                                alt="Logo"
                                src="/media/svg/brand-logos/facebook-4.svg"
                                className="theme-light-show h-15px me-3"
                            />
                            <img
                                alt="Logo"
                                src="/media/svg/brand-logos/facebook-4.svg"
                                className="theme-dark-show h-15px me-3"
                            />
                            Iniciar con Facebook
                        </a>
                        {/*end::Google link-*/}
                    </div>
                    {/*end::Col*/}
                </div>

                <div className="separator separator-content my-14">
                    <span className="w-300px text-gray-500 fw-semibold fs-7">O con correo electrónico</span>
                </div>

                <div className="fv-row mb-8">
                    {/*begin::Email*/}
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        autoComplete="off"
                        required
                        disabled={isLoading}
                        className="form-control bg-transparent"
                    />
                    {/*end::Email*/}
                </div>
                {/*end::Input group=*/}
                <div className="fv-row mb-3">
                    {/*begin::Password*/}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        autoComplete="off"
                        required
                        disabled={isLoading}
                        className="form-control bg-transparent"
                    />
                    {/*end::Password*/}
                </div>
                {/*end::Input group=*/}
                {/*begin::Wrapper*/}
                <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                    <div/>
                    {/*begin::Link*/}
                    <Link href="/forgot_password" className="link-primary">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    {/*end::Link*/}
                </div>
                {/*end::Wrapper*/}
                {/*begin::Submit button*/}
                <div className="d-grid mb-10">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-kt-indicator={isLoading ? 'on' : undefined}
                        disabled={isLoading}
                        onClick={handleFinish}
                    >
                        {/*begin::Indicator label*/}
                        <span className="indicator-label">Iniciar Sesión</span>
                        {/*end::Indicator label*/}
                        {/*begin::Indicator progress*/}
                        <span className="indicator-progress">
                            Iniciando sesión...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"/>
                        </span>
                        {/*end::Indicator progress*/}
                    </button>
                </div>
                {/*end::Submit button*/}
                {/*begin::Sign up*/}
                <div className="text-gray-500 text-center fw-semibold fs-6">
                    ¿No tienes una cuenta?
                    <Link href="/register" className="link-primary">
                        &nbsp; Registrate
                    </Link>
                </div>
                {/*end::Sign up*/}
            </div>
            {/*end::Form*/}
        </form>
    )
}