import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const ProtectedPage: FunctionComponent = ({ children }) => {
	const { isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace('/');
		}
	}, [isLoggedIn, router]);

	return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedPage;
