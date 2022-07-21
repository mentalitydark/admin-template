import Image from "../../../node_modules/next/image";
import route from 'next/router';
import Head from 'next/head';

import loadingImg from '../../../public/images/loading.gif';
import useAuth from "../../data/hook/useAuth";

interface RequiresLoginProps {
    children?:  any;
}

export default function RequiresLogin(props: RequiresLoginProps) {
    const {user, loading} = useAuth()

    const renderContent = () => (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie.includes('admin-template-auth'))
                                window.location.href = '/authentication'
                        `
                    }}
                />
            </Head>
            {props.children}
        </>
    )

    const renderLoading = () => (
        <div className="flex justify-center items-center h-screen">
            <Image src={loadingImg} alt="Loading"/>
        </div>
    )

    if(!loading && user?.email)
        return renderContent();
    else if(loading)
        return renderLoading();
    else {
        route.push('/authentication');
        return null;
    }

};
