import { Warehouse, WarehouseLocation } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class WarehouseApi {
	getWarehouses = (query?: string) =>
		$api.get<Paginated<Warehouse>>(
			query ? `/api/v1/warehouses?${query}` : '/api/v1/warehouses'
		);

	updateFiltersAndGetWarehouses = (query?: string) => {
		return $api.post<Paginated<Warehouse>>(
			query
				? `/api/v1/warehouses/filters?${query}`
				: '/api/v1/warehouses/filters'
		);
	};

	getWarehousesLocations = (query?: string) =>
		$api.get<Paginated<WarehouseLocation>>(
			query
				? `/api/v1/warehouses-locations?${query}`
				: '/api/v1/warehouses-locations'
		);

	updateFiltersAndGetWarehousesLocations = (query?: string) => {
		return $api.post<Paginated<WarehouseLocation>>(
			query
				? `/api/v1/warehouses-locations/filters?${query}`
				: '/api/v1/warehouses-locations/filters'
		);
	};

	updateOrderLocation = (
		id: number,
		value: { currentOrder: number; warehouse: string }
	) =>
		$api.post<WarehouseLocation>(
			`/api/v1/warehouses-locations/${id}/assign`,
			value
		);
}
