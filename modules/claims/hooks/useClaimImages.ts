import { Claim } from '@proovia-crm/crm-api-types';
import useSWR from 'swr';
import $api from '../../../api/api';
import { API_URL } from '../../../config/environment';

export const fetcher = async (url: string) => {
	try {
		const { data } = await $api.get<Claim>(url);
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const useClaimImages = (id: number) =>
	useSWR(`${API_URL}/api/v1/claims/${id}`, fetcher);
