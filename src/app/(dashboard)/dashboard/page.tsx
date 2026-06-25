'use client'

import {useAuth} from '@/contexts/auth/auth-context'
import DashboardDatePicker from "@/components/ui/date-picker"; // Ajusta la ruta a tu proyecto
import {format} from "date-fns";
import {useEffect, useState} from "react";
import KanbanBoard from "@/components/ui/kanban-board";

export default function DashboardPage() {
    // Estado en el padre para controlar los filtros globales
    const [filters, setFilters] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    // Esta función se ejecuta CADA VEZ que el usuario cambia el rango de fechas
    const handleDateFilterChange = (range) => {
        setFilters({
            startDate: range.from,
            endDate: range.to || range.from, // Evitamos null si solo eligen una fecha inicial
        });
    };

    // Efecto que reacciona al cambio de fechas para traer datos frescos del servidor/API
    useEffect(() => {
        const fetchDashboardData = async () => {
            const fromParam = format(filters.startDate, "yyyy-MM-dd");
            const toParam = format(filters.endDate, "yyyy-MM-dd");

            console.log(`Buscando datos en la API desde ${fromParam} hasta ${toParam}...`);
            // Aquí harías tu fetch:
            // const res = await fetch(`/api/reports?from=${fromParam}&to=${toParam}`);
        };

        fetchDashboardData();
    }, [filters]);

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar pt-6 pb-2">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">
                                Insights
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container container-fluid">
                    <DashboardDatePicker onDateChange={handleDateFilterChange}/>

                    <div className="mt-4 position-relative">
                        {/*begin::Row*/}
                        <div className="row g-3 g-lg-6">
                            {/*begin::Col*/}
                            <div className="col-3">
                                {/*begin::Items*/}
                                <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
                                    {/*begin::Symbol*/}
                                    <div className="symbol symbol-30px me-5 mb-8">
                                                <span className="symbol-label">
                                                    <i className="fa-solid fa-spinner fs-1 text-warning"></i>
                                                </span>
                                    </div>
                                    {/*end::Symbol*/}
                                    {/*begin::Stats*/}
                                    <div className="m-0">
                                        {/*begin::Number*/}
                                        <span
                                            className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                    37
                                                </span>
                                        {/*end::Number*/}
                                        {/*begin::Desc*/}
                                        <span className="text-gray-500 fw-semibold fs-6">Visas en proceso</span>
                                        {/*end::Desc*/}
                                    </div>
                                    {/*end::Stats*/}
                                </div>
                                {/*end::Items*/}
                            </div>
                            {/*end::Col*/}
                            {/*begin::Col*/}
                            <div className="col-3">
                                {/*begin::Items*/}
                                <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
                                    {/*begin::Symbol*/}
                                    <div className="symbol symbol-30px me-5 mb-8">
                                                <span className="symbol-label">
                                                    <i className="fa-regular fa-circle-check fs-1 text-success"></i>
                                                </span>
                                    </div>
                                    {/*end::Symbol*/}
                                    {/*begin::Stats*/}
                                    <div className="m-0">
                                        {/*begin::Number*/}
                                        <span
                                            className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                    6
                                                </span>
                                        {/*end::Number*/}
                                        {/*begin::Desc*/}
                                        <span className="text-gray-500 fw-semibold fs-6">Visas aprobadas</span>
                                        {/*end::Desc*/}
                                    </div>
                                    {/*end::Stats*/}
                                </div>
                                {/*end::Items*/}
                            </div>
                            {/*end::Col*/}
                            {/*begin::Col*/}
                            <div className="col-3">
                                {/*begin::Items*/}
                                <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
                                    {/*begin::Symbol*/}
                                    <div className="symbol symbol-30px me-5 mb-8">
                                                <span className="symbol-label">
                                                    <i className="fa-regular fa-circle-xmark fs-1 text-danger"></i>
                                                </span>
                                    </div>
                                    {/*end::Symbol*/}
                                    {/*begin::Stats*/}
                                    <div className="m-0">
                                        {/*begin::Number*/}
                                        <span
                                            className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                    4,7
                                                </span>
                                        {/*end::Number*/}
                                        {/*begin::Desc*/}
                                        <span className="text-gray-500 fw-semibold fs-6">Visas rechazadas</span>
                                        {/*end::Desc*/}
                                    </div>
                                    {/*end::Stats*/}
                                </div>
                                {/*end::Items*/}
                            </div>
                            {/*end::Col*/}
                            {/*begin::Col*/}
                            <div className="col-3">
                                {/*begin::Items*/}
                                <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
                                    {/*begin::Symbol*/}
                                    <div className="symbol symbol-30px me-5 mb-8">
                                                <span className="symbol-label">
                                                    <i className="fa-regular fa-clock fs-1 text-info"></i>
                                                </span>
                                    </div>
                                    {/*end::Symbol*/}
                                    {/*begin::Stats*/}
                                    <div className="m-0">
                                        {/*begin::Number*/}
                                        <span
                                            className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                    822
                                                </span>
                                        {/*end::Number*/}
                                        {/*begin::Desc*/}
                                        <span className="text-gray-500 fw-semibold fs-6">Tiempo promedio</span>
                                        {/*end::Desc*/}
                                    </div>
                                    {/*end::Stats*/}
                                </div>
                                {/*end::Items*/}
                            </div>
                            {/*end::Col*/}
                        </div>
                        {/*end::Row*/}
                    </div>

                    <div className="row mt-8">
                        <div className="col-3">
                            <div className="position-relative">
                                <i className="ki-outline ki-magnifier fs-3 text-gray-500 position-absolute top-50 translate-middle ms-6"></i>
                                <input type="text" className="form-control form-control-solid ps-10" name="search" onChange={()=>{}}
                                       value="" placeholder="Buscar por nombre, pasaporte o teléfono"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <button type="button" className="btn btn-primary"> <i className="fas fa-plus"></i> Nueva solicitud</button>
                        </div>
                    </div>

                    <div className="row mt-8">
                        <div className="col-lg-12">
                            <KanbanBoard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}