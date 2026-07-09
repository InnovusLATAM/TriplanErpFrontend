'use client'
import Link from "next/link";
import {useRecover} from "@/hooks/auth/useRecover";

import { useParams } from 'next/navigation';

export default function RecoverForm() {
    const params = useParams();

    const token = params.token as string;

    const {
        handleSubmit,
    } = useRecover();



    return (
        <div className="w-lg-500px p-10">
            <form
                onSubmit={handleSubmit}
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                id="forgot_password_form"
                data-kt-redirect-url="/authentication/layouts/overlay/new-password.html"
            >
                {/*begin::Heading*/}
                <div className="text-center mb-10">
                    {/*begin::Title*/}
                    <h1 className="text-gray-900 fw-bolder mb-3">Configurar nueva contraseña</h1>
                    {/*end::Title*/}
                    {/*begin::Link*/}
                    <div className="text-gray-500 fw-semibold fs-6">
                        ¿Ya tienes una cuenta?
                        <Link href="/login" className="link-primary fw-semibold">
                            &nbsp;
                            Inicia Sesión
                        </Link>
                    </div>
                    {/*end::Link*/}
                </div>
                {/*begin::Heading*/}

                <div className="text-center mb-4">
                    <div className="text-muted">RecoveryID - {token}</div>
                </div>

                {/*begin::Input group*/}
                <div className="fv-row mb-8" id="password1" data-kt-password-meter="true">
                    {/*begin::Wrapper*/}
                    <div className="mb-1">
                        {/*begin::Input wrapper*/}
                        <div className="position-relative mb-3">
                            <input
                                className="form-control bg-transparent"
                                type="password"
                                placeholder="Nueva Contraseña"
                                required={true}
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
                {/*begin::Input group*/}
                <div className="fv-row mb-8" id="password2" data-kt-password-meter="true">
                    {/*begin::Wrapper*/}
                    <div className="mb-1">
                        {/*begin::Input wrapper*/}
                        <div className="position-relative mb-3">
                            <input
                                className="form-control bg-transparent"
                                type="password"
                                placeholder="Repetir contraseña"
                                required={true}
                                name="confirm_password"
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


                <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                    <button
                        type="submit"
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
            </form>

        </div>

    )
}