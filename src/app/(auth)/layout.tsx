export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            {/*begin::Authentication - Sign-in */}
            <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                {/*begin::Body*/}
                <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-2">
                    {/*begin::Form*/}
                    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                        {/*begin::Wrapper*/}
                        {children}
                        {/*end::Wrapper*/}
                    </div>
                    {/*end::Form*/}
                    {/*begin::Footer*/}
                    <div className=" d-flex flex-stack px-10 mx-auto">
                        {/*begin::Links*/}
                        <div className="d-flex fw-semibold text-primary fs-base gap-5">
                            <a href="/terminos_condiciones" target="_blank">
                                Términos y condiciones
                            </a>
                            <a href="/planes" target="_blank">
                                Planes
                            </a>
                            <a href="/contacto" target="_blank">
                                Contacto
                            </a>
                        </div>
                        {/*end::Links*/}
                    </div>
                    {/*end::Footer*/}
                </div>
                {/*end::Body*/}
                {/*begin::Aside*/}
                <div
                    className="d-flex flex-lg-row-fluid w-lg-25 bgi-size-cover bgi-position-center order-1 order-lg-1"
                    style={{
                        // backgroundImage: "url(/media/misc/auth-bg.png)"
                        backgroundColor: "#1F2851"
                    }}
                >
                    {/*begin::Content*/}
                    <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                        {/*begin::Image*/}
                        <img
                            className="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-50 mb-10 mb-lg-20"
                            src="/media/auth/logo-triplan-v1.png"
                            alt=""
                        />
                        {/*end::Image*/}
                        {/*begin::Title*/}
                        <h1 className="d-none text-white fs-2qx fw-bolder text-center mb-7">
                            Nuestro sello es la calidad
                        </h1>
                        {/*end::Title*/}
                        {/*begin::Text*/}
                        <div className="d-none text-white fs-base text-center">
                            En Triplan, cada detalle cuenta. Diseñamos experiencias de viaje con altos estándares de atención, servicio y compromiso, garantizando que cada aventura supere tus expectativas. Porque para nosotros, la calidad no es una opción, es nuestro sello.
                        </div>
                        {/*end::Text*/}
                    </div>
                    {/*end::Content*/}
                </div>
                {/*end::Aside*/}
            </div>
            {/*end::Authentication - Sign-in*/}
        </>

    )
}