'use client'
import Link from "next/link";

export default function Sidebar() {
    return (
        <div
            id="kt_app_sidebar"
            className="app-sidebar flex-column"
            data-kt-drawer="true"
            data-kt-drawer-name="app-sidebar"
            data-kt-drawer-activate="{default: true, lg: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="250px"
            data-kt-drawer-direction="start"
            data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
        >
            {/*begin::Wrapper*/}
            <div className="app-sidebar-wrapper">
                <div
                    id="kt_app_sidebar_wrapper"
                    className="hover-scroll-y my-5 my-lg-2 mx-4"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-height="auto"
                    data-kt-scroll-dependencies="#kt_app_header"
                    data-kt-scroll-wrappers="#kt_app_sidebar_wrapper"
                    data-kt-scroll-offset="5px"
                >
                    {/*begin::Sidebar menu*/}
                    <div
                        id="#kt_app_sidebar_menu"
                        data-kt-menu="true"
                        data-kt-menu-expand="false"
                        className="app-sidebar-menu-primary menu menu-column menu-rounded menu-sub-indention menu-state-bullet-primary px-3 mb-5"
                    >
                        <div className="menu-item pt-5">
                            <div className="menu-content">
                                <span className="menu-heading fw-bold text-uppercase fs-7">Categoría 1</span>
                            </div>
                        </div>

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard" className="menu-link active">
                                 <span className="menu-icon">
                                    <i className="ki-duotone ki-home-2 fs-2">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                </span>
                                <span className="menu-title">Panel de Control</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/clientes" className="menu-link">
                                    <span className="menu-icon">
                                   <i className="ki-duotone ki-users fs-2">
                                     <span className="path1"></span>
                                     <span className="path2"></span>
                                     <span className="path3"></span>
                                     <span className="path4"></span>
                                    </i>
                                </span>
                                <span className="menu-title">Clientes</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/solicitudes" className="menu-link">
                                    <span className="menu-icon">
                                     <i className="ki-duotone ki-questionnaire-tablet fs-2">
                                     <span className="path1"></span>
                                     <span className="path2"></span>
                                    </i>
                                </span>
                                <span className="menu-title">Solicitudes</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        <div className="menu-item pt-5">
                            <div className="menu-content">
                                <span className="menu-heading fw-bold text-uppercase fs-7">Categoría 2</span>
                            </div>
                        </div>

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/facturacion" className="menu-link">
                                <span className="menu-icon">
                                    <i className="ki-duotone ki-bill fs-2">
                                     <span className="path1"></span>
                                     <span className="path2"></span>
                                     <span className="path3"></span>
                                     <span className="path4"></span>
                                     <span className="path5"></span>
                                     <span className="path6"></span>
                                    </i>
                                </span>
                                <span className="menu-title">Facturación</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        <div className="menu-item pt-5">
                            <div className="menu-content">
                                <span className="menu-heading fw-bold text-uppercase fs-7">Categoría 3</span>
                            </div>
                        </div>

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/configuraciones" className="menu-link">
                                    <span className="menu-icon">
                                <i className="ki-duotone ki-setting-2 fs-2">
 <span className="path1"></span>
 <span className="path2"></span>
</i>
                                </span>
                                <span className="menu-title">Configuraciones</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/perfil" className="menu-link">
                                    <span className="menu-icon">
                                  <i className="ki-duotone ki-profile-circle fs-2">
 <span className="path1"></span>
 <span className="path2"></span>
 <span className="path3"></span>
</i>
                                </span>
                                <span className="menu-title">Mi Perfil</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}

                        <div className="menu-item pt-5">
                            <div className="menu-content">
                                <span className="menu-heading fw-bold text-uppercase fs-7">Categoría 4</span>
                            </div>
                        </div>

                        {/*start::Menu option single*/}
                        <div className="menu-item">
                            <Link href="/dashboard/guias_tutoriales" className="menu-link">
                                    <span className="menu-icon">
                                <i className="ki-duotone ki-book-square fs-2">
 <span className="path1"></span>
 <span className="path2"></span>
 <span className="path3"></span>
</i>
                                </span>
                                <span className="menu-title">Guías y Tutoriales</span>
                            </Link>
                        </div>
                        {/*end::Menu option single*/}


                        {/*start: Menu option multiple*/}
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion d-none">
                            {/*begin:Menu link*/}
                            <span className="menu-link">
    <span className="menu-icon">
      <i className="ki-duotone ki-user-edit fs-2">
        <span className="path1"/>
        <span className="path2"/>
        <span className="path3"/>
      </i>
    </span>
    <span className="menu-title">Personal</span>
    <span className="menu-arrow"/>
  </span>
                            {/*end:Menu link*/}
                            {/*begin:Menu sub*/}
                            <div className="menu-sub menu-sub-accordion">
                                {/*begin:Menu item*/}
                                <div className="menu-item">
                                    {/*begin:Menu link*/}
                                    <Link href="/dashboard/personal/meseros" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"/>
                                        </span>
                                        <span className="menu-title">Mesero</span>
                                    </Link>
                                    {/*end:Menu link*/}
                                </div>
                                {/*end:Menu item*/}
                                {/*begin:Menu item*/}
                                <div className="menu-item">
                                    {/*begin:Menu link*/}
                                    <Link href="/dashboard/personal/cajeros" className="menu-link">
                                           <span className="menu-bullet">
                                              <span className="bullet bullet-dot"/>
                                            </span>
                                        <span className="menu-title">Cajeros</span>
                                    </Link>
                                    {/*end:Menu link*/}
                                </div>
                                {/*end:Menu item*/}
                            </div>
                            {/*end:Menu sub*/}
                        </div>
                        {/*end: Menu option multiple*/}
                    </div>
                    {/*end::Sidebar menu*/}
                </div>
            </div>
            {/*end::Wrapper*/}
        </div>
    )
}