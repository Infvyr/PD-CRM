import { JwtPayload } from '@proovia-crm/crm-api-types';

export function parseJwt(token: string): JwtPayload {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}

export function parseAccessToken() {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('accessToken');
		return token ? parseJwt(token) : null;
	}
	return null;
}

export function getAccessToken() {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('accessToken');
		if (token) return token;
	}
	return null;
}

export function setAccessToken(token: string) {
	if (typeof window !== 'undefined') {
		localStorage.setItem('accessToken', token);
	}
}

export function removeAccessToken() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('accessToken');
	}
}
