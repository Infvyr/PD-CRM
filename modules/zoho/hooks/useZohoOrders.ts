import useSWR from 'swr';
import { ZohoFindOrdersQuery } from '@proovia-crm/crm-api-types';
import { ZohoApi } from '../../../api/zoho.api';

export function useZohoOrders(query: ZohoFindOrdersQuery) {
	const shouldFetch = Object.values(query).some((param) => param !== undefined);

	const zohoApi = new ZohoApi();
	const { data, error, ...rest } = useSWR(
		shouldFetch ? `/api/v1/zoho/orders/${JSON.stringify(query)}` : null,
		() => zohoApi.findOrder(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
}
