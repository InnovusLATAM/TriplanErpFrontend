"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, subDays, startOfMonth, endOfMonth, isSameDay, startOfDay,  } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

export default function SystemDatePicker({ onDateChange }) {
    const [open, setOpen] = useState(false);

    const today = startOfDay(new Date());
    const [confirmedRange, setConfirmedRange] = useState({ from: today, to: today });
    const [tempRange, setTempRange] = useState({ from: today, to: today });

    const [activePreset, setActivePreset] = useState("Hoy");
    const [labelTitle, setLabelTitle] = useState("Hoy:");

    // Estados independientes para controlar los meses/años de cada calendario
    const [monthCalendar1, setMonthCalendar1] = useState(new Date());
    const [monthCalendar2, setMonthCalendar2] = useState(new Date());

    const currentYear = new Date().getFullYear();




    // 1. Meses en español para tus dropdowns personalizados
    const months = [
        { value: 0, label: "Enero" },
        { value: 1, label: "Febrero" },
        { value: 2, label: "Marzo" },
        { value: 3, label: "Abril" },
        { value: 4, label: "Mayo" },
        { value: 5, label: "Junio" },
        { value: 6, label: "Julio" },
        { value: 7, label: "Agosto" },
        { value: 8, label: "Septiembre" },
        { value: 9, label: "Octubre" },
        { value: 10, label: "Noviembre" },
        { value: 11, label: "Diciembre" },
    ];

    // Generamos un rango de años (desde hace 20 años hasta 5 años en el futuro)
    const years = Array.from({ length: 21 }, (_, i) => currentYear - 20 + i);

    // 2. Presets en español
    const presets = [
        { label: "Hoy", from: today, to: today },
        { label: "Ayer", from: subDays(today, 1), to: subDays(today, 1) },
        { label: "Últimos 7 días", from: subDays(today, 6), to: today },
        { label: "Últimos 30 días", from: subDays(today, 29), to: today },
        { label: "Este mes", from: startOfMonth(today), to: endOfMonth(today) },
        { label: "Mes anterior", from: startOfMonth(subDays(startOfMonth(today), 1)), to: endOfMonth(subDays(startOfMonth(today), 1)) },
    ];

    const handleOpenPicker = () => {
        setTempRange(confirmedRange);
        setMonthCalendar1(confirmedRange.from || new Date());
        setMonthCalendar2(confirmedRange.to || new Date());
        setOpen(!open);
    };

    // Manejador para actualizar el mes/año desde nuestros combos externos
    const handleDropdownChange = (calendarNum, type, value) => {
        setActivePreset("Custom");
        if (calendarNum === 1) {
            const currentMonth = type === "month" ? parseInt(value) : monthCalendar1.getMonth();
            const currentYearVal = type === "year" ? parseInt(value) : monthCalendar1.getFullYear();
            setMonthCalendar1(new Date(currentYearVal, currentMonth, 1));
        } else {
            const currentMonth = type === "month" ? parseInt(value) : monthCalendar2.getMonth();
            const currentYearVal = type === "year" ? parseInt(value) : monthCalendar2.getFullYear();
            setMonthCalendar2(new Date(currentYearVal, currentMonth, 1));
        }
    };

    const handlePresetClick = (preset) => {
        setActivePreset(preset.label);
        setTempRange({ from: preset.from, to: preset.to });
        setConfirmedRange({ from: preset.from, to: preset.to });
        setMonthCalendar1(preset.from);
        setMonthCalendar2(preset.to);
        updateLabels(preset.from, preset.to, preset.label);
        if (onDateChange) onDateChange({ from: preset.from, to: preset.to });
        setOpen(false);
    };

    const handleApply = () => {
        if (tempRange?.from) {
            setConfirmedRange(tempRange);
            updateLabels(tempRange.from, tempRange.to, activePreset);
            if (onDateChange) onDateChange(tempRange);
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setTempRange(confirmedRange);
        setOpen(false);
    };

    const updateLabels = (from, to, label) => {
        if (!to || label === "Hoy") {
            setLabelTitle("Hoy:");
        } else if (label === "Ayer") {
            setLabelTitle("Ayer:");
        } else {
            setLabelTitle("");
        }
    };

// Cambia el formato de texto del botón disparador
    const renderRangeText = () => {
        const { from, to } = confirmedRange;
        if (!from) return "Seleccionar fecha";
        // Usamos el locale 'es' para que los meses salgan en español (ej: "24 de jun")
        if (!to || isSameDay(from, to)) return format(from, "d 'de' MMM", { locale: es });
        return `${format(from, "d 'de' MMM", { locale: es })} - ${format(to, "d 'de' MMM", { locale: es })}`;
    };

    const handleCalendarSelect = (val) => {
        setTempRange(val || { from: undefined, to: undefined });
        setActivePreset("Custom"); // <-- Aquí ocurre la magia
    };

    return (
        <div className="position-relative d-inline-block">
            {/* Botón Disparador */}
            <div className="btn btn-sm btn-light d-flex align-items-center px-4 py-2" style={{ cursor: "pointer" }} onClick={handleOpenPicker}>
                {labelTitle && <span className="text-muted fw-bold me-2">{labelTitle}</span>}
                <span className="text-primary fw-bolder">{renderRangeText()}</span>
                <i className="ki-duotone ki-calendar-8 fs-2 ms-2"></i>
            </div>

            {/* Contenedor Dropdown */}
            {open && (
                <div
                    className="bg-white shadow rounded p-4 position-absolute d-flex flex-column flex-md-row gap-4 mt-2"
                    style={{ zIndex: 1050, left: 0, border: "1px solid #e4e6ef", width: "max-content", maxWidth: "90vw" }}
                >
                    {/* Presets */}
                    <div className="d-flex flex-row flex-md-column gap-1 overflow-auto pb-2 pb-md-0" style={{ minWidth: "160px" }}>
                        {presets.map((p) => (
                            <button
                                key={p.label}
                                className={`btn btn-sm text-start text-nowrap px-3 py-2 ${activePreset === p.label ? "btn-light-primary active" : "btn-active-light-primary"}`}
                                onClick={() => handlePresetClick(p)}
                            >
                                {p.label}
                            </button>
                        ))}
                        <button
                            className={`btn btn-sm text-start text-nowrap px-3 py-2 ${activePreset === "Custom" ? "btn-light-primary active" : "btn-active-light-primary"}`}
                            onClick={() => setActivePreset("Custom")}
                        >
                            Rango personalizado
                        </button>
                    </div>

                    {/* Calendarios + Combos Manuales */}
                    <div className="pt-3 border-md-top-0 pt-md-0 border-md-start ps-md-4 d-flex flex-column justify-content-between">

                        <div className="d-flex flex-column flex-md-row gap-5">

                            {/* CALENDARIO 1 (DESDE) */}
                            <div className="d-flex flex-column align-items-center">
                                <span className="text-muted fw-bold mb-2 fs-7 text-uppercase">Desde</span>

                                {/* Combos rápidos independientes para el Calendario 1 */}
                                <div className="d-flex gap-2 mb-2 w-100">
                                    <select
                                        className="form-select form-select-sm bg-light border-0 fw-bold"
                                        value={monthCalendar1.getMonth()}
                                        onChange={(e) => handleDropdownChange(1, "month", e.target.value)}
                                    >
                                        {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>

                                    <select
                                        className="form-select form-select-sm bg-light border-0 fw-bold"
                                        value={monthCalendar1.getFullYear()}
                                        onChange={(e) => handleDropdownChange(1, "year", e.target.value)}
                                    >
                                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>

                                <DayPicker
                                    locale={es}
                                    mode="range"
                                    selected={tempRange}
                                    onSelect={handleCalendarSelect}
                                    month={monthCalendar1}
                                    onMonthChange={setMonthCalendar1}
                                    showNavigation={false} // Ocultamos flechas nativas para usar solo los combos
                                    styles={
                                        {
                                            caption: { display: "none" },
                                            day: {
                                                fontSize: "1rem",     // Achica el texto del número (por defecto suele ser 1rem o más)
                                                width: "32px",           // Ajusta el ancho del círculo/cuadrado azul
                                                height: "32px",          // Ajusta el alto para que quede simétrico
                                            },
                                        }
                                    } // Ocultamos texto nativo
                                />
                            </div>

                            {/* CALENDARIO 2 (HASTA) */}
                            <div className="d-flex flex-column align-items-center border-md-start ps-md-4">
                                <span className="text-muted fw-bold mb-2 fs-7 text-uppercase">Hasta</span>

                                {/* Combos rápidos independientes para el Calendario 2 */}
                                <div className="d-flex gap-2 mb-2 w-100">
                                    <select
                                        className="form-select form-select-sm bg-light border-0 fw-bold"
                                        value={monthCalendar2.getMonth()}
                                        onChange={(e) => handleDropdownChange(2, "month", e.target.value)}
                                    >
                                        {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>

                                    <select
                                        className="form-select form-select-sm bg-light border-0 fw-bold"
                                        value={monthCalendar2.getFullYear()}
                                        onChange={(e) => handleDropdownChange(2, "year", e.target.value)}
                                    >
                                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>

                                <DayPicker
                                    locale={es}
                                    mode="range"
                                    selected={tempRange}
                                    onSelect={handleCalendarSelect} // 👈 Cambiado aquí también
                                    month={monthCalendar2}
                                    onMonthChange={setMonthCalendar2}
                                    showNavigation={false}
                                    styles={
                                    {
                                        caption: { display: "none" },
                                        day: {
                                            fontSize: "1rem",     // Achica el texto del número (por defecto suele ser 1rem o más)
                                            width: "32px",           // Ajusta el ancho del círculo/cuadrado azul
                                            height: "32px",          // Ajusta el alto para que quede simétrico
                                        },
                                    }}
                                />
                            </div>

                        </div>

                        {/* Botones de acción inferiores */}
                        <div className="d-flex justify-content-end gap-2 pt-2 border-top mt-3">
                            <button className="btn btn-sm btn-light-danger fw-bold" onClick={handleCancel}>Cancelar</button>
                            <button className="btn btn-sm btn-primary fw-bold" onClick={handleApply} disabled={!tempRange?.from}>Aplicar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}