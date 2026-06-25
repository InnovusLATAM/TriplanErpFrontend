'use client'

import {useState} from 'react'
import {useAuth} from '@/contexts/auth-context'
import {useRouter} from 'next/navigation'
import Link from "next/link";

export default function RegisterForm() {
    const {login} = useAuth()
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const success = await login(email, password)

            if (success) {
                router.push('/dashboard')
            } else {
                setError('Email o contraseña incorrectos')
            }
        } catch (err) {
            setError('Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-lg-500px p-10">
            {/*begin::Form*/}
            <div
                className="form w-100"
                id="kt_sign_up_form"
                data-kt-redirect-url="/authentication/layouts/overlay/sign-in.html"
            >
                {/*begin::Heading*/}
                <div className="text-center mb-11">
                    {/*begin::Title*/}
                    <h1 className="text-gray-900 fw-bolder mb-3">Registro</h1>
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
                            Registrarse con Google
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
                            Registrarse con Facebook
                        </a>
                        {/*end::Google link-*/}
                    </div>
                    {/*end::Col*/}
                </div>

                <div className="separator separator-content my-14">
                    <span className="w-300px text-gray-500 fw-semibold fs-7">O con correo electrónico</span>
                </div>

                {/*begin::Input group=*/}
                <div className="fv-row mb-8">
                    {/*begin::Email*/}
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        autoComplete="off"
                        className="form-control bg-transparent"
                    />
                    {/*end::Email*/}
                </div>
                {/*begin::Input group*/}
                <div className="fv-row mb-8" data-kt-password-meter="true">
                    {/*begin::Wrapper*/}
                    <div className="mb-1">
                        {/*begin::Input wrapper*/}
                        <div className="position-relative mb-3">
                            <input
                                className="form-control bg-transparent"
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                autoComplete="off"
                            />
                            <span
                                className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                                data-kt-password-meter-control="visibility"
                            >
            <i className="ki-outline ki-eye-slash fs-2"/>
            <i className="ki-outline ki-eye fs-2 d-none"/>
          </span>
                        </div>
                        {/*end::Input wrapper*/}
                        {/*begin::Meter*/}
                        <div
                            className="d-flex align-items-center mb-3"
                            data-kt-password-meter-control="highlight"
                        >
                            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"/>
                            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"/>
                            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"/>
                            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"/>
                        </div>
                        {/*end::Meter*/}
                    </div>
                    {/*end::Wrapper*/}
                    {/*begin::Hint*/}
                    <div className="text-muted">
                        Utilice 8 o más caracteres con una combinación de letras, números &amp; símbolos.
                    </div>
                    {/*end::Hint*/}
                </div>
                {/*end::Input group=*/}
                {/*end::Input group=*/}
                <div className="fv-row mb-8">
                    {/*begin::Repeat Password*/}
                    <input
                        placeholder="Repetir contraseña"
                        name="confirm-password"
                        type="password"
                        autoComplete="off"
                        className="form-control bg-transparent"
                    />
                    {/*end::Repeat Password*/}
                </div>
                {/*end::Input group=*/}
                {/*begin::Accept*/}
                <div className="fv-row mb-8">
                    <label className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="toc"
                            defaultValue={1}
                        />
                        <span className="form-check-label fw-semibold text-gray-700 fs-base ms-1">
          Acepto los
          <a href="javascript:void(0)" className="ms-1 link-primary">
            Términos y Condiciones
          </a>
        </span>
                    </label>
                </div>
                {/*end::Accept*/}
                {/*begin::Submit button*/}
                <div className="d-grid mb-10">
                    <button type="submit" id="kt_sign_up_submit" className="btn btn-primary">
                        {/*begin::Indicator label*/}
                        <span className="indicator-label">Registrarse</span>
                        {/*end::Indicator label*/}
                        {/*begin::Indicator progress*/}
                        <span className="indicator-progress">
          Please wait...
          <span className="spinner-border spinner-border-sm align-middle ms-2"/>
        </span>
                        {/*end::Indicator progress*/}
                    </button>
                </div>
                {/*end::Submit button*/}
                {/*begin::Sign up*/}
                <div className="text-gray-500 text-center fw-semibold fs-6">
                    ¿Ya tienes une cuenta?
                    <Link href="/login" className="link-primary fw-semibold">
                        &nbsp;
                        Inicia Sesión
                    </Link>
                </div>
                {/*end::Sign up*/}
            </div>
            {/*end::Form*/}
        </div>

    )
}