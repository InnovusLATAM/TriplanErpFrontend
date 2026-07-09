import Spinner from "react-bootstrap/esm/Spinner";

export default function NotasCliente(props: any) {

    const {notasCliente,isLoading} = props;

    // const { user } = useUser();

    // const userImage = `https://dashboard.cenape.com/middleware/defaultAvatar.php?userName=${user?.full_name}`;

    const notas = notasCliente.notes ?? [];

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                <Spinner animation="border" variant="primary"/>
                <span className="ms-3">Cargando notas del cliente...</span>
            </div>
        );
    }

    return (
        <>
            <div
                className="card-body p-0 tab-pane fade show active mt-9"
            >
                {/*begin::Timeline*/}
                <div className="timeline timeline-border-dashed">
                    {notas.map((nota) => (
                        <>
                            <div className="timeline-item">
                                {/*begin::Timeline line*/}
                                <div className="timeline-line"/>
                                {/*end::Timeline line*/}
                                {/*begin::Timeline icon*/}
                                <div className="timeline-icon">
                                    <i className="ki-outline ki-message-text-2 fs-2 text-gray-500"/>
                                </div>
                                {/*end::Timeline icon*/}
                                {/*begin::Timeline content*/}
                                <div className="timeline-content mb-10 mt-n1">
                                    {/*begin::Timeline heading*/}
                                    <div className="pe-3 mb-5">
                                        {/*begin::Title*/}
                                        <div className="fs-5 fw-semibold mb-2">
                                            {nota.text}
                                        </div>
                                        {/*end::Title*/}
                                        {/*begin::Description*/}
                                        <div className="d-flex align-items-center mt-1 fs-6">
                                            {/*begin::Info*/}
                                            <div className="text-muted me-2 fs-7">Creada el {nota.createdAt}</div>
                                            {/*end::Info*/}
                                            {/*begin::User*/}
                                            <div
                                                className="symbol symbol-circle symbol-25px"
                                                data-bs-toggle="tooltip"
                                                data-bs-boundary="window"
                                                data-bs-placement="top"
                                                aria-label="Nina Nilson"
                                                data-bs-original-title="Nina Nilson"
                                                data-kt-initialized={1}
                                            >
                                                {/*<img src={userImage} alt="img"/> &nbsp;*/}
                                                {/*{user?.full_name}*/}
                                            </div>
                                            {/*end::User*/}
                                        </div>
                                        {/*end::Description*/}
                                    </div>
                                    {/*end::Timeline heading*/}
                                </div>
                                {/*end::Timeline content*/}
                            </div>
                        </>
                    ))}
                </div>
                {/*end::Timeline*/}
            </div>
        </>
    )
}