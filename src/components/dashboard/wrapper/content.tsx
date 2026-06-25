'use client'
import Link from "next/link";

export default function Content({children}: { children: React.ReactNode }) {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            {/*begin::Content wrapper*/}
            <div className="d-flex flex-column flex-column-fluid">
                <div id="main-container" style={{height:"100%"}}>
                    {children}
                </div>
            </div>
            {/*end::Content wrapper*/}
            {/*begin::Footer*/}
            <div id="kt_app_footer" className="app-footer">
                {/*begin::Footer container*/}
                <div
                    className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                    {/*begin::Copyright*/}
                    <div className="text-gray-900 order-2 order-md-1">
                        <span className="text-muted fw-semibold me-1">2026©</span>
                        <Link
                            href="https://innovus-software.com"
                            target="_blank"
                            className="text-gray-800 text-hover-primary"
                        >
                            Triplan-Solutions Dashboard - Made with Innovus-Software S.A.S Technologies
                        </Link>
                    </div>
                    {/*end::Copyright*/}
                    {/*begin::Menu*/}
                    <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                        <li className="menu-item">
                            <a
                                href="https://innovus-software.com"
                                target="_blank"
                                className="menu-link px-2"
                            >
                                Acerca de
                            </a>
                        </li>
                        <li className="menu-item">
                            <a
                                href="https://innovus-software.com"
                                target="_blank"
                                className="menu-link px-2"
                            >
                                Soporte
                            </a>
                        </li>
                        <li className="menu-item">
                            <a
                                href="https://innovus-software.com"
                                target="_blank"
                                className="menu-link px-2"
                            >
                                Planes
                            </a>
                        </li>
                    </ul>
                    {/*end::Menu*/}
                </div>
                {/*end::Footer container*/}
            </div>
            {/*end::Footer*/}
        </div>
    )
}