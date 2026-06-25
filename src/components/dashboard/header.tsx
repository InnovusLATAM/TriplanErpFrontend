'use client'

import { useLogout } from '@/hooks/auth/useLogout';
import Link from "next/link";
import { useUser } from '@/hooks/dashboard/core/useUser';

export default function Header() {

    const { logout } = useLogout();
    const { user, isLoading } = useUser();

    const userImage = `https://dashboard.cenape.com/middleware/defaultAvatar.php?userName=${user?.full_name}`;

    return (
        <div id="kt_app_header" className="app-header d-flex flex-column flex-stack">
            {/*begin::Header main*/}
            <div className="d-flex flex-stack flex-grow-1">
                <div
                    className="app-header-logo d-flex align-items-center ps-lg-12"
                    id="kt_app_header_logo"
                >
                    {/*begin::Sidebar toggle*/}
                    <div
                        id="kt_app_sidebar_toggle"
                        className="app-sidebar-toggle btn btn-sm btn-icon bg-body btn-color-gray-500 btn-active-color-primary w-30px h-30px ms-n2 me-4 d-none d-lg-flex"
                        data-kt-toggle="true"
                        data-kt-toggle-state="active"
                        data-kt-toggle-target="body"
                        data-kt-toggle-name="app-sidebar-minimize"
                    >
                        <i className="ki-outline ki-abstract-14 fs-3 mt-1" />
                    </div>
                    {/*end::Sidebar toggle*/}
                    {/*begin::Sidebar mobile toggle*/}
                    <div
                        className="btn btn-icon btn-active-color-primary w-35px h-35px ms-3 me-2 d-flex d-lg-none"
                        id="kt_app_sidebar_mobile_toggle"
                    >
                        <i className="ki-outline ki-abstract-14 fs-2" />
                    </div>
                    {/*end::Sidebar mobile toggle*/}
                    {/*begin::Logo*/}
                    <a href="index.html" className="app-sidebar-logo">
                        <img
                            alt="Logo"
                            src="../media/logos/logo-triplan-v2.png"
                            className="h-35px theme-light-show"
                        />
                        <img
                            alt="Logo"
                            src="../media/logos/logo-triplan-v2.png"
                            className="h-35px theme-dark-show"
                        />
                    </a>
                    {/*end::Logo*/}
                </div>
                {/*begin::Navbar*/}
                <div
                    className="app-navbar flex-grow-1 justify-content-end"
                    id="kt_app_header_navbar"
                >
                    {/*begin::User menu*/}
                    <div
                        className="app-navbar-item ms-2 ms-lg-6"
                        id="kt_header_user_menu_toggle"
                    >
                        {/*begin::Menu wrapper*/}
                        <div
                            className="cursor-pointer symbol symbol-circle symbol-30px symbol-lg-45px"
                            data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                            data-kt-menu-attach="parent"
                            data-kt-menu-placement="bottom-end"
                        >
                            <img src={userImage} alt="user" />
                        </div>
                        {/*begin::User account menu*/}
                        <div
                            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                            data-kt-menu="true"
                        >
                            {/*begin::Menu item*/}
                            <div className="menu-item px-3">
                                <div className="menu-content d-flex align-items-center px-3">
                                    {/*begin::Avatar*/}
                                    <div className="symbol symbol-50px me-5">
                                        <img alt="Logo" src={userImage} />
                                    </div>
                                    {/*end::Avatar*/}
                                    {/*begin::Username*/}
                                    <div className="d-flex flex-column">
                                        {isLoading ? (
                                            <div className="fw-bold d-flex align-items-center fs-5">Cargando...</div>
                                        ) : (
                                            <>
                                                <div className="fw-bold d-flex align-items-center fs-5">
                                                    {user?.full_name}
                                                    <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                                                        Pro
                                                    </span>
                                                </div>
                                                <a
                                                    href="#"
                                                    className="fw-semibold text-muted text-hover-primary fs-7"
                                                >
                                                    {user?.email}
                                                </a>
                                            </>
                                        )}
                                    </div>
                                    {/*end::Username*/}
                                </div>
                            </div>
                            {/*end::Menu item*/}
                            {/*begin::Menu separator*/}
                            <div className="separator my-2" />
                            {/*end::Menu separator*/}
                            {/*begin::Menu item*/}
                            <div className="menu-item px-5">
                                <Link href="/dashboard/perfil"  className="menu-link px-5">
                                    Mi Perfil
                                </Link>
                            </div>
                            {/*end::Menu item*/}

                            {/*begin::Menu separator*/}
                            <div className="separator my-2" />
                            {/*end::Menu separator*/}

                            {/*begin::Menu item*/}
                            <div className="menu-item px-5 my-1">
                                <Link href="/dashboard/configuraciones"  className="menu-link px-5">
                                    Configuraciones
                                </Link>
                            </div>
                            {/*end::Menu item*/}
                            {/*begin::Menu item*/}
                            <div className="menu-item px-5">
                                <Link href="" onClick={logout}
                                    className="menu-link px-5"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>
                            {/*end::Menu item*/}
                        </div>
                        {/*end::User account menu*/}
                        {/*end::Menu wrapper*/}
                    </div>
                    {/*end::User menu*/}
                    {/*begin::Action*/}
                    <div className="app-navbar-item ms-2 ms-lg-6 me-lg-6">
                        {/*begin::Link*/}
                        <button
                            onClick={logout}
                            className="btn btn-icon btn-custom btn-color-gray-600 btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
                        >
                            <i className="ki-outline ki-exit-right fs-1" />
                        </button>
                        {/*end::Link*/}
                    </div>
                    {/*end::Action*/}
                    {/*begin::Header menu toggle*/}
                    <div className="app-navbar-item ms-2 ms-lg-6 ms-n2 me-3 d-flex d-lg-none">
                        <div
                            className="btn btn-icon btn-custom btn-color-gray-600 btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
                            id="kt_app_aside_mobile_toggle"
                        >
                            <i className="ki-outline ki-burger-menu-2 fs-2" />
                        </div>
                    </div>
                    {/*end::Header menu toggle*/}
                </div>
                {/*end::Navbar*/}
            </div>
            {/*end::Header main*/}
            {/*begin::Separator*/}
            <div className="app-header-separator" />
            {/*end::Separator*/}
        </div>
    )
}