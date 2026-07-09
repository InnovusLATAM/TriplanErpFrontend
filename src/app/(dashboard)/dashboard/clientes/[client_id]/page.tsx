// app/(dashboard)/dashboard/clientes/page.tsx
'use client';

import Link from "next/link";
import {useParams} from "next/navigation";
import DetalleCliente from "@/components/dashboard/clientes/detalle-cliente";
import NotasCliente from "@/components/dashboard/clientes/notas-cliente";
import NuevaNotaCliente from "@/components/dashboard/clientes/nueva-nota-cliente";
import {useDetalleCliente} from "@/hooks/dashboard/clientes/useDetalleCliente";

export default function DetalleClientePage() {
    const params = useParams();
    const client_id = params.client_id as string;

    const cliente = useDetalleCliente({idCliente: client_id});

    return (
        <>
            {/* Toolbar */}
            <div id="kt_app_toolbar" className="app-toolbar pt-6 pb-2">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">
                                Dashboard</h1>
                            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
                                <li className="breadcrumb-item text-muted">
                                    <Link href="/dashboard" className="text-muted text-hover-primary">Inicio</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-500 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <Link href="/dashboard/clientes" className="text-muted text-hover-primary">Clientes</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-500 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-muted">{`Cliente {${client_id}}`}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container container-fluid">
                    <div className="d-flex flex-column flex-xl-row">
                        {/*begin::Sidebar*/}
                        <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
                            {/*begin::Card*/}
                            <div className="card mb-5 mb-xl-8">
                                {/*begin::Card body*/}
                                <div className="card-body pt-15">
                                    <DetalleCliente {...cliente}/>
                                </div>
                                {/*end::Card body*/}
                            </div>
                            {/*end::Card*/}
                        </div>
                        {/*end::Sidebar*/}

                        {/*begin::Content*/}
                        <div className="flex-lg-row-fluid ms-lg-15">
                            <div className="card card-flush pt-3 mb-5 mb-lg-10">
                                {/*begin::Card header*/}
                                <div className="card-header">
                                    {/*begin::Card title*/}
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label fw-bold text-gray-900">Solicitudes de visa de EE.UU.</span>
                                        <span className="text-muted mt-1 fw-semibold fs-7">Gestiona las solicitudes de visa de EE.UU para este cliente</span>
                                    </h3>
                                    {/*begin::Card title*/}
                                    {/*begin::Card toolbar*/}
                                    <div className="card-toolbar">
                                        <button
                                            type="button"
                                            className="btn btn-light-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#kt_modal_add_product"
                                        >
                                            Nueva solicitud
                                        </button>
                                    </div>
                                    {/*end::Card toolbar*/}
                                </div>
                                {/*end::Card header*/}
                                {/*begin::Card body*/}
                                <div className="card-body pt-0">
                                    <div className="notice d-flex bg-light-dark rounded border-primary border border-dashed p-6 mt-4">
                                        {/*begin::Icon*/}
                                        <i className="ki-outline ki-bank fs-2tx text-primary me-4" />
                                        {/*end::Icon*/}
                                        {/*begin::Wrapper*/}
                                        <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                            {/*begin::Content*/}
                                            <div className="mb-3 mb-md-0 fw-semibold">
                                                <h4 className="text-gray-900 fw-bold">
                                                    Aún no hay solicitud de visa de EEUU
                                                </h4>
                                                <div className="fs-6 pe-7 text-muted">
                                                    Este cliente no tiene solicitudes de visa de EEUU aún. Crea la primera para comenzar
                                                </div>
                                            </div>
                                            {/*end::Content*/}
                                            {/*begin::Action*/}
                                            <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap">
                                                Nueva solicitud
                                            </a>
                                            {/*end::Action*/}
                                        </div>
                                        {/*end::Wrapper*/}
                                    </div>

                                    <NuevaNotaCliente {...cliente}/>

                                    <NotasCliente {...cliente}/>

                                </div>
                                {/*end::Card body*/}
                            </div>
                        </div>
                        {/*end::Content*/}
                    </div>
                </div>
            </div>
        </>
    );
}