import { Order, OrderDriver, OrderImage } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class OrderApi {
	searchOrders = async (id: number) =>
		$api.get<Paginated<Order>>(`/api/v1/orders/${id}`);

	getOrderDrivers = async (id: number) =>
		$api.get<OrderDriver[]>(`/api/v1/orders/${id}/drivers`);

	getOrder = async (id: number) => $api.get<Order>(`/api/v1/orders/${id}`);

	// will be edited as soon as endpoints is ready
	getOrdersHistory = async () =>
		$api.get('https://jsonplaceholder.typicode.com/users');

	getOrderImages = async (id: number) =>
		$api.get<OrderImage[]>(`/api/v1/orders/${id}/images`);

	getOrders = (query?: string) =>
		$api.get<Paginated<Order>>(
			query ? `/api/v1/orders?${query}` : '/api/v1/orders'
		);

	updateFiltersAndGetOrders = (query?: string) => {
		return $api.post<Paginated<Order>>(
			query ? `/api/v1/orders?${query}` : '/api/v1/orders'
		);
	};
}
