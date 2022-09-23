import { parseAccessToken } from '../utils/jwt';
import { useState, useEffect, useCallback } from 'react';
import { AuthApi } from '../api/auth.api';
import { useForceUpdate } from './useForceUpdate';

export const useJwt = () => {
	const revalidate = useForceUpdate();
	const [isLoading, setIsLoading] = useState(true);
	const jwt = parseAccessToken();
	const isLoggedIn = !!jwt?.exp && Date.now() < jwt.exp * 1000;

	const updateAccessToken = useCallback(() => {
		if (!isLoggedIn) {
			const authApi = new AuthApi();
			authApi
				.refreshToken()
				.catch((error) => console.log(error))
				.finally(() => {
					setIsLoading(false);
					revalidate();
				});
		} else {
			setIsLoading(false);
		}
	}, [revalidate, isLoggedIn]);

	useEffect(() => {
		updateAccessToken();
	}, [updateAccessToken]);

	return { ...jwt, isLoading, isLoggedIn, revalidate };
};
