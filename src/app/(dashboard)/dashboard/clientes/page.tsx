// app/(dashboard)/dashboard/clientes/page.tsx
'use client';

import {useState} from 'react';
import {RegistrarClienteModal} from '@/components/dashboard/clientes/modals/registrar';
import {EditarClienteModal} from '@/components/dashboard/clientes/modals/editar';
import {useClientes} from '@/hooks/dashboard/clientes/useClientes';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import {Dialog} from "@/lib/sweet-alert-dialogs";

import type {Cliente} from '@/types/dashboard/clientes/clientes';
import {useRouter} from 'next/navigation'

export default function ClientesPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const {
        clientes,
        pagination,
        isLoading,
        error,
        deleteCliente
    } = useClientes({page, limit: 20, search});

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset a primera página al buscar
        setSearch(searchInput);
    };

    // ✅ Manejadores para los modales
    const handleEdit = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setShowEditModal(true);
    };

    const handleShowClient= (cliente: Cliente) =>{
        const clientId = cliente.uuid;
        router.push(`/dashboard/clientes/${clientId}`);
    }

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setSelectedCliente(null);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = async (clienteId: string) => {
        const result = await Dialog.confirm(
            '¿Estás seguro de eliminar este cliente?',
            'Eliminar Cliente'
        );
        if (!result.isConfirmed) return;

        try {
            const response = await deleteCliente(clienteId);
            Dialog.success(response.message || 'Cliente eliminado exitosamente');
        } catch (error: any) {
            Dialog.error(error?.message || 'Error al eliminar el cliente');
        }
    };

    const handleClienteCreated = () => {
        setShowCreateModal(false);
        // Si estamos en la primera página, se revalidará automáticamente
        // Si no, volver a la primera página para ver el nuevo cliente
        if (page !== 1) {
            setPage(1);
        }
    };

    // Renderizar paginación
    const renderPagination = () => {
        if (!pagination || pagination.totalPages <= 1) return null;

        const items = [];
        for (let i = 1; i <= pagination.totalPages; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === pagination.page}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return (
            <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="text-muted">
          Mostrando {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} clientes
        </span>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                    />
                    {items}
                    <Pagination.Next
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                    />
                </Pagination>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                <Spinner animation="border" variant="primary"/>
                <span className="ms-3">Cargando clientes...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                <i className="ki-duotone ki-information-5 fs-2 me-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                </i>
                Error al cargar los clientes: {error.message || 'Error desconocido'}
            </div>
        );
    }

    return (
        <div>
            {/* Toolbar */}
            <div id="kt_app_toolbar" className="app-toolbar pt-6 pb-2">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">
                                Dashboard</h1>
                            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
                                <li className="breadcrumb-item text-muted">
                                    <a href="index.html" className="text-muted text-hover-primary">Inicio</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-500 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-muted">Clientes</li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="btn btn-sm fw-bold btn-primary"
                            >
                                <i className="ki-duotone ki-plus-squared fs-2 me-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                                Nuevo Cliente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container container-fluid">
                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSearch}
                                  className="d-flex align-items-center position-relative my-1 mb-4">
                                <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-5">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                                <input
                                    type="text"
                                    className="form-control form-control-solid w-250px ps-13"
                                    placeholder="Buscar cliente..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </form>

                            <div className="table-responsive">
                                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                                    <thead>
                                    <tr className="fw-semibold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                        <th className="ps-4 rounded-start">Nombre</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Estado</th>
                                        <th className="rounded-end text-end pe-4">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {clientes.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-8">
                                                <div className="d-flex flex-column align-items-center">
                                                    <i className="ki-duotone ki-users fs-3x text-muted mb-3">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                    </i>
                                                    <span className="text-muted fs-5">No hay clientes registrados</span>
                                                    <span className="text-muted fs-7 mt-1">
                          Haz clic en &ldquo;Nuevo Cliente&rdquo; para agregar uno
                        </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        clientes.map((cliente) => (
                                            <tr key={cliente.uuid}>
                                                <td className="ps-4">
                                                    <div className="d-flex flex-column">
                          <span className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6">
                            {cliente.first_name} {cliente.last_name}
                          </span>
                                                    </div>
                                                </td>
                                                <td>
                        <span className="text-gray-700 fw-semibold fs-6">
                          {cliente.email}
                        </span>
                                                </td>
                                                <td>
                        <span className="text-gray-700 fw-semibold fs-6">
                          {cliente.phone.country.dialCode} {cliente.phone.number}
                        </span>
                                                </td>
                                                <td>
                        <span className={`badge badge-light-${cliente.estado === 'ACTIVO' ? 'success' : 'danger'}`}>
                          {cliente.estado}
                        </span>
                                                </td>
                                                <td className="text-end pe-4">
                                                    <button
                                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                                        title="Ver cliente"
                                                        onClick={() => handleShowClient(cliente)}
                                                    >
                                                        <i className="ki-duotone ki-eye fs-2">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                        </i>
                                                    </button>
                                                    <button
                                                        className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                                                        title="Eliminar"
                                                        onClick={() => handleDelete(cliente.uuid)}
                                                    >
                                                        <i className="ki-duotone ki-trash fs-2">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                            <span className="path3"></span>
                                                            <span className="path4"></span>
                                                            <span className="path5"></span>
                                                        </i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Paginación */}
                            {renderPagination()}

                        </div>
                    </div>
                </div>
            </div>

            {/*/!* Modal *!/*/}
            {/*<EditarClienteModal*/}
            {/*    show={showEditModal}*/}
            {/*    onHide={handleEditModalClose}*/}
            {/*    cliente={selectedCliente}*/}
            {/*/>*/}

            <RegistrarClienteModal
                show={showCreateModal}
                onHide={handleClienteCreated}
            />
        </div>
    );
}