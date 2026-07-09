'use client'

import Link from "next/link";
import SystemSelect from "@/components/ui/select";
import { countries } from '@/lib/data/countries';
import { useRegisterForm, CountryOption } from '@/hooks/auth/useRegister';

export default function RegisterForm() {
    const {
        country,
        setCountry,
        tipoCuenta,
        handleChange,
        handleFinish,
        handleSubmit,
    } = useRegisterForm();

    return (
        <div className="w-100" id="formulario_registro" >
            {/*begin::Stepper*/}
            <div
                className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid gap-10"
                id="kt_create_account_stepper"
            >
                {/*begin::Aside*/}
                <div className="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px">
                    {/*begin::Wrapper*/}
                    <div className="card-body px-6 px-lg-10 px-xxl-15 py-20">
                        {/*begin::Nav*/}
                        <div className="stepper-nav">
                            {/*begin::Step 1*/}
                            <div className="stepper-item current" data-kt-stepper-element="nav">
                                {/*begin::Wrapper*/}
                                <div className="stepper-wrapper">
                                    {/*begin::Icon*/}
                                    <div className="stepper-icon w-40px h-40px">
                                        <i className="ki-outline ki-check fs-2 stepper-check" />
                                        <span className="stepper-number">1</span>
                                    </div>
                                    {/*end::Icon*/}
                                    {/*begin::Label*/}
                                    <div className="stepper-label">
                                        <h3 className="stepper-title">Creación de la cuenta</h3>
                                        <div className="stepper-desc fw-semibold">
                                            Configure los detalles de su cuenta
                                        </div>
                                    </div>
                                    {/*end::Label*/}
                                </div>
                                {/*end::Wrapper*/}
                                {/*begin::Line*/}
                                <div className="stepper-line h-40px" />
                                {/*end::Line*/}
                            </div>
                            {/*end::Step 1*/}
                            {/*begin::Step 2*/}
                            <div className="stepper-item mark-completed" data-kt-stepper-element="nav">
                                {/*begin::Wrapper*/}
                                <div className="stepper-wrapper">
                                    {/*begin::Icon*/}
                                    <div className="stepper-icon w-40px h-40px">
                                        <i className="ki-outline ki-check fs-2 stepper-check" />
                                        <span className="stepper-number">2</span>
                                    </div>
                                    {/*end::Icon*/}
                                    {/*begin::Label*/}
                                    <div className="stepper-label">
                                        <h3 className="stepper-title">Información adicional</h3>
                                        <div className="stepper-desc fw-semibold">
                                            Configure los detalles adicionales de su cuenta
                                        </div>
                                    </div>
                                    {/*end::Label*/}
                                </div>
                                {/*end::Wrapper*/}
                            </div>
                        </div>
                        {/*end::Nav*/}
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*begin::Aside*/}
                {/*begin::Content*/}
                <div className="card d-flex flex-row-fluid flex-center">
                    {/*begin::Form*/}
                    <form
                        className="card-body py-20 w-100 mw-xl-700px px-9"
                        onSubmit={handleSubmit}
                        id="kt_create_account_form"
                    >
                        {/*begin::Step 1*/}
                        <div className="current" data-kt-stepper-element="content" >
                            {/*begin::Wrapper*/}
                            <div className="w-100">
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
                                            placeholder="Nombres"
                                            name="nombres"
                                            autoComplete="off"
                                            className="form-control bg-transparent"
                                            required={true}
                                        />
                                        {/*end::Email*/}
                                    </div>
                                    {/*begin::Input group*/}

                                    {/*begin::Input group=*/}
                                    <div className="fv-row mb-8">
                                        {/*begin::Email*/}
                                        <input
                                            type="text"
                                            placeholder="Correo electrónico"
                                            name="email"
                                            autoComplete="off"
                                            className="form-control bg-transparent"
                                            required={true}
                                        />
                                        {/*end::Email*/}
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
                                                    placeholder="Contraseña"
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
                                    {/*begin::Accept*/}
                                    <div className="fv-row mb-8">
                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="terminos_condiciones"
                                                required={true}
                                                defaultValue="1"
                                            />
                                            <span className="form-check-label fw-semibold text-gray-700 fs-base ms-1">
                                                Acepto los <a href="#" className="ms-1 link-primary">Términos y Condiciones</a>
                                            </span>
                                        </label>
                                    </div>
                                    {/*end::Accept*/}
                                    {/*begin::Sign up*/}
                                    <div className="text-gray-500 text-center fw-semibold fs-6">
                                        ¿Ya tienes una cuenta?
                                        <Link href="/login" className="link-primary fw-semibold">
                                            &nbsp;
                                            Inicia Sesión
                                        </Link>
                                    </div>
                                    {/*end::Sign up*/}
                                </div>
                            </div>
                            {/*end::Wrapper*/}
                        </div>
                        {/*end::Step 1*/}
                        {/*begin::Step 2*/}
                        <div data-kt-stepper-element="content">
                            {/*begin::Wrapper*/}
                            <div className="w-100">
                                {/*begin::Heading*/}
                                <div className="pb-10 pb-lg-15">
                                    {/*begin::Title*/}
                                    <h2 className="fw-bold text-gray-900">Información adicional</h2>
                                    {/*end::Title*/}
                                    {/*begin::Notice*/}
                                    <div className="text-muted fw-semibold fs-6">
                                        Esta información nos ayuda a completar tu perfíl de cuenta.
                                    </div>
                                    {/*end::Notice*/}
                                </div>
                                {/*end::Heading*/}
                                {/*begin::Input group*/}
                                <div className="mb-10 fv-row">
                                    {/*begin::Label*/}
                                    <label className="d-flex align-items-center form-label mb-3">
                                        País
                                        <span
                                            className="ms-1"
                                            data-bs-toggle="tooltip"
                                            title="Provide your team size to help us setup your billing"
                                        >
                                            <i className="ki-outline ki-information-5 text-gray-500 fs-6"/>
                                        </span>
                                    </label>
                                    {/*end::Label*/}
                                    <SystemSelect
                                        options={countries}
                                        value={country}
                                        placeholder="Seleccione una opción..."
                                        onChange={(option: CountryOption | null) => setCountry(option)}
                                    />
                                    <input
                                        type="hidden"
                                        name="pais"
                                        value={country?.value || ''}
                                    />
                                </div>
                                {/*end::Input group*/}
                                {/*begin::Input group*/}
                                <div className="mb-10 fv-row">
                                    {/*begin::Label*/}
                                    <label className="form-label mb-3">Código de registro</label>
                                    {/*end::Label*/}
                                    {/*begin::Input*/}
                                    <input
                                        type="text"
                                        className="form-control form-control-lg form-control-solid"
                                        name="codigo_registro"
                                        placeholder=""
                                        defaultValue=""
                                    />
                                    {/*end::Input*/}
                                    <div className="text-muted">Dejar en blanco si no lo tienes</div>
                                </div>
                                {/*end::Input group*/}
                                {/*begin::Input group*/}
                                <div className="mb-0 fv-row">
                                    {/*begin::Label*/}
                                    <label className="d-flex align-items-center form-label mb-5">
                                        ¿Te registras como negocio?
                                        <span
                                            className="ms-1"
                                            data-bs-toggle="tooltip"
                                            title="Monthly billing will be based on your account plan"
                                        >
                  <i className="ki-outline ki-information-5 text-gray-500 fs-6" />
                </span>
                                    </label>
                                    {/*end::Label*/}
                                    {/*begin::Options*/}
                                    <div className="mb-0">
                                        {/*begin:Option*/}
                                        <label className="d-flex flex-stack mb-5 cursor-pointer">
                                            {/*begin:Label*/}
                                            <span className="d-flex align-items-center me-2">
                    {/*begin::Icon*/}
                                                <span className="symbol symbol-50px me-6">
                      <span className="symbol-label">
                        <i className="ki-outline ki-bank fs-1 text-gray-600" />
                      </span>
                    </span>
                                                {/*end::Icon*/}
                                                {/*begin::Description*/}
                                                <span className="d-flex flex-column">
                      <span className="fw-bold text-gray-800 text-hover-primary fs-5">
                        Sí
                      </span>
                      <span className="fs-6 fw-semibold text-muted">
                        Texto informativo
                      </span>
                    </span>
                                                {/*end:Description*/}
                  </span>
                                            {/*end:Label*/}
                                            {/*begin:Input*/}
                                            <span className="form-check form-check-custom form-check-solid">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipo_cuenta"
                        checked={tipoCuenta === "1"}
                        onChange={handleChange}
                        value="1"
                    />
                  </span>
                                            {/*end:Input*/}
                                        </label>
                                        {/*end::Option*/}
                                        {/*begin:Option*/}
                                        <label className="d-flex flex-stack mb-5 cursor-pointer">
                                            {/*begin:Label*/}
                                            <span className="d-flex align-items-center me-2">
                    {/*begin::Icon*/}
                                                <span className="symbol symbol-50px me-6">
                      <span className="symbol-label">
                        <i className="ki-outline ki-chart fs-1 text-gray-600" />
                      </span>
                    </span>
                                                {/*end::Icon*/}
                                                {/*begin::Description*/}
                                                <span className="d-flex flex-column">
                      <span className="fw-bold text-gray-800 text-hover-primary fs-5">
                        No
                      </span>
                      <span className="fs-6 fw-semibold text-muted">
                        Texto Informativo
                      </span>
                    </span>
                                                {/*end:Description*/}
                  </span>
                                            {/*end:Label*/}
                                            {/*begin:Input*/}
                                            <span className="form-check form-check-custom form-check-solid">
                    <input
                        className="form-check-input"
                        type="radio"
                        checked={tipoCuenta === "2"}
                        name="tipo_cuenta"
                        onChange={handleChange}
                        value="2"
                    />
                  </span>
                                            {/*end:Input*/}
                                        </label>
                                        {/*end::Option*/}
                                    </div>
                                    {/*end::Options*/}
                                </div>
                                {/*end::Input group*/}

                                {
                                    tipoCuenta === "1" && (

                                    <div className="mt-10 fv-row">
                                        <label className="form-label mb-3">Nombre del negocio</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="nombre_negocio"
                                            placeholder=""
                                            defaultValue=""
                                        />
                                    </div>
                                    )
                                }
                            </div>
                            {/*end::Wrapper*/}
                        </div>
                        {/*end::Step 2*/}
                        {/*begin::Actions*/}
                        <div className="d-flex flex-stack pt-10">
                            {/*begin::Wrapper*/}
                            <div className="mr-2">
                                <button
                                    type="button"
                                    className="btn btn-lg btn-light-primary me-3"
                                    data-kt-stepper-action="previous"
                                >
                                    <i className="ki-outline ki-arrow-left fs-4 me-1" />
                                    Regresar
                                </button>
                            </div>
                            {/*end::Wrapper*/}
                            {/*begin::Wrapper*/}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary me-3"
                                    onClick={handleFinish}
                                    data-kt-stepper-action="submit"
                                >
                                    <span className="indicator-label">
                                    Finalizar
                                    <i className="ki-outline ki-arrow-right fs-3 ms-2 me-0" />
                                  </span>
                                    <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary"
                                    data-kt-stepper-action="next"
                                >
                                    Continuar &nbsp;
                                    <i className="ki-outline ki-arrow-right fs-4 ms-1 me-0" />
                                </button>
                            </div>
                            {/*end::Wrapper*/}
                        </div>
                        {/*end::Actions*/}
                    </form>
                    {/*end::Form*/}
                </div>
                {/*end::Content*/}
            </div>
            {/*end::Stepper*/}
        </div>
    )
}
