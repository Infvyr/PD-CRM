import useSWR from 'swr';
import { ZohoFindTasksQuery } from '@proovia-crm/crm-api-types';
import { ZohoApi } from '../../../api/zoho.api';

export function useZohoTasks(query: ZohoFindTasksQuery) {
	const shouldFetch = Object.values(query).some((param) => param !== undefined);

	const zohoApi = new ZohoApi();
	const { data, error, ...rest } = useSWR(
		shouldFetch ? `/api/v1/zoho/tasks/${JSON.stringify(query)}` : null,
		() => zohoApi.findTasks(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
}
