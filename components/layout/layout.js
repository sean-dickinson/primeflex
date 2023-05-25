import Head from 'next/head';
import { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import NewsSection from '../news/newssection';
import AppContentContext from './appcontentcontext';
import Footer from './footer';
import Menu from './menu';
import Topbar from './topbar';

export default function Layout(props) {
    const [sidebarActive, setSidebarActive] = useState(false);
    const router = useRouter();

    const wrapperClassName = classNames('layout-wrapper', {
        'layout-dark layout-wrapper-dark': props.dark,
        'layout-light layout-wrapper-light': !props.dark,
        'layout-news-active': props.newsActive
    });
    const maskClassName = classNames('layout-mask', {
        'layout-mask-active': sidebarActive
    });

    const onMenuButtonClick = () => {
        setSidebarActive(true);
    };

    const toggleColorScheme = () => {
        props.onThemeChange(!props.dark);
    };

    const onMaskClick = () => {
        setSidebarActive(false);
    };

    useEffect(() => {
        document.body.classList.add(...wrapperClassName.split(' '));

        return () => {
            document.body.classList.remove(...wrapperClassName.split(' '));
        };
    }, [wrapperClassName]);

    useEffect(() => {
        if (sidebarActive) document.body.classList.add('blocked-scroll');
        else document.body.classList.remove('blocked-scroll');
    }, [sidebarActive]);

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            setSidebarActive(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return (
        <div className={wrapperClassName}>
            <Head>
                <title>PrimeFlex - Utility-First CSS Library</title>
                <meta charSet="UTF-8" />
                <meta name="description" content="PrimeFlex is a utility-first CSS library." />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@primeflexcss" />
                <meta name="twitter:title" content="PrimeFlex | Utility-First CSS Library" />
                <meta name="twitter:description" content="PrimeFlex is a utility-first CSS library." />
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="PrimeFlex - Utility-First CSS Library"></meta>
                <meta property="og:url" content="https://primeflex.org"></meta>
                <meta property="og:description" content="PrimeFlex is a utility-first CSS library." />
                <meta property="og:image" content="https://www.primefaces.org/static/social/primereact-preview.jpg"></meta>
                <meta property="og:ttl" content="604800"></meta>
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon"></link>
            </Head>
            {props.newsActive && <NewsSection announcement={props.announcement} onClose={props.onNewsClose} />}
            <Topbar dark={props.dark} onMenuButtonClick={onMenuButtonClick} onToggleColorScheme={toggleColorScheme} />
            <Menu active={sidebarActive} darkTheme={props.dark} />
            <AppContentContext.Provider
                value={{
                    ripple: true,
                    inputStyle: 'outlined',
                    darkTheme: props.dark
                }}
            >
                <div className="layout-content">
                    <div className="layout-content-inner">
                        {props.children}
                        <Footer></Footer>
                    </div>
                </div>
            </AppContentContext.Provider>
            <div className={maskClassName} onClick={onMaskClick}></div>
        </div>
    );
}
