'use client'

export default function Usuarios() {
    return (
        <>
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
                                <li className="breadcrumb-item text-muted">Cajas</li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <button className="btn btn-flex btn-primary h-40px fs-7 fw-bold" data-bs-toggle="modal"
                                    data-bs-target="#kt_modal_create_campaign" >
                                <i className="ki-outline ki-plus fs-2"></i>
                                Aperturar nueva caja
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr className="fw-bold fs-6 text-gray-800">
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>Edinburgh</td>
                                        <td>61</td>
                                        <td>2011/04/25</td>
                                        <td>$320,800</td>
                                    </tr>
                                    <tr>
                                        <td>Garrett Winters</td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}