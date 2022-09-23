import { OrderImage } from '@proovia-crm/crm-api-types';
import { AxiosResponse } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';
import { OrderApi } from '../../../api/orders.api';

export const useOrderImages = (
	orderId?: number | string,
	config?: SWRConfiguration
) => {
	const ordersApi = new OrderApi();

	const { data, error, ...rest } = useSWR<AxiosResponse<OrderImage[]>>(
		orderId ? `/api/v1/orders/${orderId}/images` : null,
		() => ordersApi.getOrderImages(+(orderId as number | string)),
		{ revalidateOnFocus: false, ...config }
	);

	const loading = !data && !error && orderId;

	return { data: data?.data, error, loading, ...rest };
};
