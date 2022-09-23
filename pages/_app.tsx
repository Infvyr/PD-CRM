import '@crm/shared';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import ProtectedPage from '../components/ProtectedPage/ProtectedPage';
import { AuthProvider } from '../context/AuthProvider';
import { DashboardLayout } from '../layout';
import { GlobalStyles } from '../styles/';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

NProgress.configure({
	easing: 'ease',
	speed: 500,
	showSpinner: false
});

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
	const privateClassName = 'nCmIR';
	const router = useRouter();

	const ROUTES = [router.pathname.startsWith('/admin')];

	useEffect(() => {
		const handleRouteStart = () => NProgress.start();
		const handleRouteDone = () => NProgress.done();

		router.events.on('routeChangeStart', handleRouteStart);
		router.events.on('routeChangeComplete', handleRouteDone);
		router.events.on('routeChangeError', handleRouteDone);

		return () => {
			router.events.off('routeChangeStart', handleRouteStart);
			router.events.off('routeChangeComplete', handleRouteDone);
			router.events.off('routeChangeError', handleRouteDone);
		};
	}, []);

	useEffect(() => {
		ROUTES.map(() =>
			ROUTES.includes(true)
				? document.body.classList.add(privateClassName)
				: (document.body.className = '')
		);
	});

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Proovia CRM</title>
			</Head>

			<GlobalStyles />

			<AuthProvider>
				{pageProps.public ? (
					<Component {...pageProps} />
				) : (
					<ProtectedPage>
						<DashboardLayout>
							<Component {...pageProps} />
						</DashboardLayout>
					</ProtectedPage>
				)}
			</AuthProvider>
		</>
	);
}

export default CustomApp;
