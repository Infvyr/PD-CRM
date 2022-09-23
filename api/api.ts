import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_URL } from '../config/environment';
import { getAccessToken, removeAccessToken } from '../utils/jwt';
import { AuthApi } from './auth.api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

$api.interceptors.request.use(
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		const accessToken = getAccessToken();
		if (accessToken && config.headers) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

$api.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error: AxiosError) => {
		const config: AxiosRequestConfig & { _retry?: boolean } = error.config;
		if (config.url !== '/api/v1/auth/login' && error.response) {
			if (error.response.status === 401 && !config._retry) {
				config._retry = true;
				try {
					const authApi = new AuthApi();
					const resp = authApi.refreshToken();

					return resp.then((token) => {
						if (config.headers) {
							config.headers['Authorization'] = token;
						}
						return $api(config);
					});
				} catch (error) {
					return Promise.reject(error);
				}
			}
			if (error.response.status === 401 && config._retry) {
				removeAccessToken();
				window.location.reload();
			}
		}

		return Promise.reject(error);
	}
);

export default $api;
