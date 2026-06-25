'use client'
export default function Wrapper({children}: { children: React.ReactNode }) {
    return (
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            {children}
        </div>
    )
}