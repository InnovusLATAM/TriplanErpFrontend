"use client";

import React, { useState } from "react";
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects, useDroppable,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ==========================================
// 1. ESTRUCTURA DE DATOS DUMMY (Simulando API)
// ==========================================
interface Task {
    id: string;
    title: string;
    description: string;
}

interface BoardState {
    [key: string]: Task[];
}

const DEFAULT_DATA: BoardState = {
    "recolectando": [
        { id: "t1", title: "Configurar Servidor Nginx", description: "Optimizar producción" },
        { id: "t2", title: "Diseñar Mockups", description: "Nueva UI limpia" },
    ],
    "ds160_enviado": [
        { id: "t3", title: "Integrar API de Pagos", description: "Pasarela local" },
    ],
    "pendiente_pago": [
        { id: "t4", title: "Desarrollar Kanban Board", description: "Usando Next.js" },
    ],
    "busqueda_cita": [
        { id: "t5", title: "Pruebas de QA", description: "Validar flujos" },
    ],
    "finalizada": [
        { id: "t6", title: "Definir Modelo NoSQL", description: "Colecciones MongoDB" },
    ],
};

// Mapeo de IDs de columnas a nombres legibles para la interfaz
const COLUMN_NAMES: { [key: string]: string } = {
    "recolectando": "Recolectando",
    "ds160_enviado": "DS160 ENVIADO",
    "pendiente_pago": "Pendiente de Pago",
    "busqueda_cita": "En Busqueda de Cita",
    "finalizada": "Finalizada",
};

// ==========================================
// 2. COMPONENTE TARJETA (Task Card)
// ==========================================
function TaskCard({ task }: { task: Task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        cursor: "grab",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners} // Ponemos los listeners aquí para que TODA la tarjeta sea arrastrable
            className={`card shadow-sm border-start border-1 border-primary mb-2 ${
                isDragging ? "border-dashed" : ""
            }`}
        >
            <div className="card-body p-3">
                <h6 className="card-title fw-bold text-dark mb-1">{task.title}</h6>
                <p className="card-text text-muted small mb-0">{task.description}</p>
            </div>
        </div>
    );
}

// Componente espejo solo para el efecto visual flotante mientras arrastras
function TaskCardOverlay({ task }: { task: Task }) {
    return (
        <div className="card shadow border-start border-2 border-primary" style={{ cursor: "grabbing" }}>
            <div className="card-body p-3">
                <h6 className="card-title fw-bold text-dark mb-1">{task.title}</h6>
                <p className="card-text text-muted small mb-0">{task.description}</p>
            </div>
        </div>
    );
}

// ==========================================
// 3. COMPONENTE COLUMNA (Kanban Column)
// ==========================================
function KanbanColumn({ id, title, tasks }: { id: string; title: string; tasks: Task[] }) {
    // Registramos esta columna como una zona de drop activa
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="card bg-light border-1 flex-shrink-0" style={{ width: "280px" }}>
            <div className="card-header bg-transparent border-0 pt-3 pb-2 d-flex justify-content-between align-items-center">
                <h6 className="fw-bold text-uppercase mb-0 small">{title}</h6>
                <span className="badge bg-secondary rounded-pill">{tasks.length}</span>
            </div>

            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div
                    ref={setNodeRef} // 👈 ¡MUY IMPORTANTE! Conectamos el nodo aquí
                    className="card-body p-2 d-flex flex-column gap-2 overflow-y-auto"
                    style={{ minHeight: "450px", maxHeight: "70vh" }}
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {tasks.length === 0 && (
                        <div className="text-center text-muted my-auto small py-4 border border-secondary border-dashed rounded">
                            Suelta tareas aquí
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
}

// ==========================================
// 4. COMPONENTE PRINCIPAL (Board)
// ==========================================
interface KanbanBoardProps {
    initialColumns?: string[]; // Prop opcional para definir qué columnas renderizar dinámicamente
}

export default function KanbanBoard({ initialColumns }: KanbanBoardProps) {
    // Si mandan columnas por props, filtramos/creamos el estado basado en ellas, si no, usamos las 5 por defecto
    const columnsToRender = initialColumns || Object.keys(DEFAULT_DATA);

    // Inicializamos el estado estructurado por columnas
    const [columns, setColumns] = useState<BoardState>(() => {
        const initialState: BoardState = {};
        columnsToRender.forEach((colId) => {
            initialState[colId] = DEFAULT_DATA[colId] || [];
        });
        return initialState;
    });

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    // Configuración de sensores para soporte de mouse, touch y teclado
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // 5px de tolerancia para no confundir click con drag
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Función auxiliar para saber en qué columna está una tarea actualmente
    const findColumnOfTask = (taskId: string) => {
        if (taskId in columns) return taskId; // Si el ID es ya de una columna
        return Object.keys(columns).find((key) => columns[key].some((t) => t.id === taskId));
    };

    // Dispara cuando se empieza a arrastrar
    function handleDragStart(event: any) {
        const { active } = event;
        const activeContainer = findColumnOfTask(active.id);
        if (activeContainer) {
            const task = columns[activeContainer].find((t) => t.id === active.id);
            if (task) setActiveTask(task);
        }
    }

    // Dispara MIENTRAS mueves la tarjeta sobre las listas (vital para cruzar columnas)
    function handleDragOver(event: any) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findColumnOfTask(activeId);
        const overContainer = findColumnOfTask(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        setColumns((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            const activeIndex = activeItems.findIndex((t) => t.id === activeId);
            const overIndex = overItems.findIndex((t) => t.id === overId);

            let newIndex;
            if (overId in prev) {
                // Se soltó sobre el contenedor vacío de la columna
                newIndex = overItems.length;
            } else {
                // Se soltó sobre otra tarea
                const isBelowOverItem =
                    over &&
                    over.rect && // Nos aseguramos de que el rect exista
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
            }

            return {
                ...prev,
                [activeContainer]: activeItems.filter((item) => item.id !== activeId),
                [overContainer]: [
                    ...overItems.slice(0, newIndex),
                    prev[activeContainer][activeIndex],
                    ...overItems.slice(newIndex),
                ],
            };
        });
    }

    // Dispara cuando dejas caer la tarjeta (finaliza el ordenamiento)
    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (!over) {
            setActiveTask(null);
            return;
        }

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findColumnOfTask(activeId);
        const overContainer = findColumnOfTask(overId);

        if (activeContainer && overContainer && activeContainer === overContainer) {
            const activeIndex = columns[activeContainer].findIndex((t) => t.id === activeId);
            const overIndex = columns[overContainer].findIndex((t) => t.id === overId);

            if (activeIndex !== overIndex) {
                setColumns((prev) => ({
                    ...prev,
                    [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
                }));
            }
        }

        setActiveTask(null);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            {/* Contenedor horizontal dinámico usando Bootstrap Utilities */}
            <div className="d-flex gap-3 p-3 overflow-x-auto align-items-start w-100 bg-white rounded">
                {columnsToRender.map((colId) => (
                    <KanbanColumn
                        key={colId}
                        id={colId}
                        title={COLUMN_NAMES[colId] || colId}
                        tasks={columns[colId] || []}
                    />
                ))}
            </div>

            {/* Overlay para ver la tarjeta flotando suavemente al arrastrar */}
            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                    styles: { active: { opacity: "0.3" } },
                }),
            }}>
                {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
}