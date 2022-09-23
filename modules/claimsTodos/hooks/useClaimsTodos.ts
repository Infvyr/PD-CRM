import { PaginatedClaimTodo } from '@proovia-crm/crm-api-types';
import useSWR from 'swr';
import $api from '../../../api/api';

export const fetchClaims = async (url: string) => {
	try {
		const { data } = await $api.get<PaginatedClaimTodo>(url);
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const useClaimsTodos = (index: number, limit: number) =>
	useSWR(
		`/api/v1/claim-todos?page=${index}&limit=${limit}&sortBy=createdAt:DESC`,
		fetchClaims
	);

export const useClaimsOutstandingTodos = (index: number, limit: number) =>
	useSWR(
		`/api/v1/claim-todos?page=${index}&limit=${limit}&sortBy=createdAt:DESC&filter.completedAt=$null`,
		fetchClaims
	);
