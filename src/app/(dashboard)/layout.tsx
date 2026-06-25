'use client'

import {useAuth} from '@/contexts/auth/auth-context'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react';

import Header from '@/components/dashboard/header'
import Wrapper from "@/components/dashboard/wrapper";
import Sidebar from "@/components/dashboard/wrapper/sidebar";
import Content from "@/components/dashboard/wrapper/content";
import Aside from "@/components/dashboard/wrapper/aside";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {

    useEffect(() => {
        document.body.id = 'kt_app_body';
        document.body.classList.add('app-default');
        document.body.classList.remove('app-blank','bgi-size-cover','bgi-attachment-fixed','bgi-position-center');
        document.body.setAttribute('data-kt-app-header-fixed', 'true');
        document.body.setAttribute('data-kt-app-header-fixed-mobile', 'true');
        document.body.setAttribute('data-kt-app-sidebar-enabled', 'true');
        document.body.setAttribute('data-kt-app-sidebar-fixed', 'true');
        document.body.setAttribute('data-kt-app-sidebar-hoverable', 'true');
        document.body.setAttribute('data-kt-app-sidebar-push-toolbar', 'true');
        document.body.setAttribute('data-kt-app-sidebar-push-footer', 'true');
        document.body.setAttribute('data-kt-app-aside-enabled', 'true');
        document.body.setAttribute('data-kt-app-aside-fixed', 'true');
        document.body.setAttribute('data-kt-app-aside-push-toolbar', 'true');
        document.body.setAttribute('data-kt-app-aside-push-footer', 'true');

        KTMenu.init();
        KTToggle.init();

        return () => {
            document.body.classList.remove('app-default');
            document.body.classList.add('app-blank','bgi-size-cover','bgi-attachment-fixed','bgi-position-center');
            document.body.removeAttribute('data-kt-app-header-fixed');
            document.body.removeAttribute('data-kt-app-header-fixed-mobile');
            document.body.removeAttribute('data-kt-app-sidebar-enabled');
            document.body.removeAttribute('data-kt-app-sidebar-fixed');
            document.body.removeAttribute('data-kt-app-sidebar-hoverable');
            document.body.removeAttribute('data-kt-app-sidebar-push-toolbar');
            document.body.removeAttribute('data-kt-app-sidebar-push-footer');
            document.body.removeAttribute('data-kt-app-aside-enabled');
            document.body.removeAttribute('data-kt-app-aside-fixed');
            document.body.removeAttribute('data-kt-app-aside-push-toolbar');
            document.body.removeAttribute('data-kt-app-aside-push-footer');
        };
    }, []);

    return (
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
            <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Header/>
                <Wrapper>
                    <Sidebar/>
                    <Content>
                        {children}
                    </Content>
                    <Aside/>
                </Wrapper>
            </div>
        </div>
    )
}