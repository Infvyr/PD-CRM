import { JwtUser } from '@proovia-crm/crm-api-types';
import { createContext, FC, useCallback, useMemo } from 'react';
import { AuthApi } from '../api/auth.api';
import { useJwt } from '../hooks/useJwt';
interface AuthContext {
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	isLoggedIn: boolean;
	user?: JwtUser;
}

const initialAuthContext: AuthContext = {
	isLoggedIn: false,
	user: undefined,
	login: () => Promise.resolve(),
	logout: () => Promise.resolve()
};

const authApi = new AuthApi();

const AuthContext = createContext<AuthContext>(initialAuthContext);
if (process.env.NODE_ENV === 'development') {
	AuthContext.displayName = 'AuthContext';
}

export const AuthProvider: FC = ({ children }) => {
	const { isLoading, isLoggedIn, revalidate, user } = useJwt();

	const login = useCallback(
		async (email: string, password: string) => {
			await authApi.login(email, password);
			revalidate();
		},
		[revalidate]
	);

	const logout = useCallback(async () => {
		await authApi.logout();
		revalidate();
	}, [revalidate]);

	const contextValue = useMemo<AuthContext>(
		() => ({
			login,
			logout,
			isLoggedIn,
			user
		}),
		[login, logout, isLoggedIn, user]
	);

	return isLoading ? null : (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
