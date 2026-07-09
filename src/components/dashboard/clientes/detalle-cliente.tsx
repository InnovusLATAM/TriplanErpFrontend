import {useEffect, useState} from "react";
import type {Cliente} from "@/types/dashboard/clientes/clientes";
import Spinner from "react-bootstrap/esm/Spinner";
import {EditarClienteModal} from "@/components/dashboard/clientes/modals/editar";


export default function DetalleCliente(props:any) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

    const {detalleCliente,isLoading,mutateDetalle} = props;

    const cliente = detalleCliente.client;

    const userImage = `https://dashboard.cenape.com/middleware/defaultAvatar.php?userName=${cliente?.first_name}`;

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setSelectedCliente(null);
    };

    // Creamos una función limpia para abrir el modal clonando el cliente actual
    const handleEditModalOpen = () => {
        if (cliente) {
            setSelectedCliente(cliente);
            setShowEditModal(true);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                <Spinner animation="border" variant="primary"/>
                <span className="ms-3">Cargando datos del cliente...</span>
            </div>
        );
    }

    return (
        <>
            {/*begin::Summary*/}
            <div className="d-flex flex-center flex-column mb-5">
                {/*begin::Avatar*/}
                <div className="symbol symbol-100px symbol-circle mb-7">
                    <img src={userImage} alt="image"/>
                </div>
                {/*end::Avatar*/}
                {/*begin::Name*/}
                <a
                    href="#"
                    className="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
                >
                    {cliente.first_name} {cliente.last_name}
                </a>
                {/*end::Name*/}
                {/*begin::Position*/}
                <div className="fs-5 fw-semibold text-muted mb-6">
                    Cliente
                </div>
                {/*end::Position*/}
            </div>
            {/*end::Summary*/}
            {/*begin::Details toggle*/}
            <div className="d-flex flex-stack fs-4 py-3">
                <div
                    className="fw-bold rotate collapsible"
                    data-bs-toggle="collapse"
                    href="#kt_customer_view_details"
                    role="button"
                    aria-expanded="false"
                    aria-controls="kt_customer_view_details"
                >
                    Detalles
                    <span className="ms-2 rotate-180">
              <i className="ki-outline ki-down fs-3"/>
            </span>
                </div>
                <span
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-original-title="Edit customer details"
                    data-kt-initialized={1}
                >
            <button
                className="btn btn-sm btn-light-primary"
                type="button" onClick={handleEditModalOpen}
            >
              Editar
            </button>
          </span>
            </div>
            {/*end::Details toggle*/}
            <div className="separator separator-dashed my-3"/>
            {/*begin::Details content*/}
            <div id="kt_customer_view_details" className="collapse show">
                <div className="py-5 fs-6">
                    {/*begin::Badge*/}
                    <div className="badge badge-light-info d-inline">Cliente</div>
                    {/*begin::Badge*/}
                    <div className="fw-bold mt-5">ID</div>
                    <div className="text-gray-600">{cliente.uuid}</div>
                    {/*begin::Details item*/}
                    <div className="fw-bold mt-5">Nombres</div>
                    <div className="text-gray-600">{cliente.first_name} {cliente.last_name}</div>
                    {/*begin::Details item*/}
                    {/*begin::Details item*/}
                    <div className="fw-bold mt-5">Email</div>
                    <div className="text-gray-600">
                        <a href="#" className="text-gray-600 text-hover-primary">
                            {cliente.email}
                        </a>
                    </div>
                    {/*begin::Details item*/}
                    {/*begin::Details item*/}
                    <div className="fw-bold mt-5">Celular</div>
                    <div className="text-gray-600">
                        {cliente.phone.e164}
                    </div>
                    {/*begin::Details item*/}
                    {/*begin::Details item*/}
                    <div className="fw-bold mt-5">Creado</div>
                    <div className="text-gray-600">
                        {cliente.createdAt}
                    </div>
                    {/*begin::Details item*/}
                </div>
            </div>
            {/*end::Details content*/}

            <EditarClienteModal
                show={showEditModal}
                onHide={handleEditModalClose}
                cliente={selectedCliente}
                onSave={mutateDetalle}
            />
        </>
    )
}