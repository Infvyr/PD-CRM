import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../config/environment';
import { AuthResponse } from '../types/Authentication.interface';
import { setAccessToken } from '../utils/jwt';
import $api from './api';
import { message } from 'antd';

let refreshTokenPromise: Promise<AxiosResponse<AuthResponse>> | null;
export class AuthApi {
	async login(email: string, password: string) {
		try {
			const response = await $api.post<AuthResponse>('/api/v1/auth/login', {
				email,
				password
			});
			const accessToken = response.data.access_token;
			setAccessToken(accessToken);
		} catch (err: unknown) {
			if (axios.isAxiosError(err) && err.response) {
				const { data, status } = err.response;
				switch (status) {
					case 400:
						message.error('Missing email or password!');
						return;
					case 401:
						message.error(data.message);
						return;
					default:
						message.error(
							'Access forbidden! Please, contact the provider for more details.'
						);
						return;
				}
			}
			message.error('Something went wrong. Please try again later...');
		}
	}

	async logout() {
		await $api.post('/api/v1/auth/logout');
		localStorage.removeItem('accessToken');
	}

	refreshToken = async () => {
		if (!refreshTokenPromise) {
			refreshTokenPromise = axios.post<AuthResponse>(
				`${API_URL}/api/v1/auth/refresh`,
				{
					withCredentials: true
				}
			);
		}
		return refreshTokenPromise
			.then((axiosResponse) => {
				const accessToken = axiosResponse.data.access_token;
				setAccessToken(accessToken);
				return accessToken;
			})
			.finally(() => {
				refreshTokenPromise = null;
			});
	};
}
