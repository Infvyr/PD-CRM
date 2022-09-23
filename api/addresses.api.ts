import { Address, CreateAddress } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class AddressesApi {
	getAddresses = (query?: string) =>
		$api.get<Paginated<Address>>(
			query ? `/api/v1/addresses?${query}` : '/api/v1/addresses'
		);

	updateFiltersAndGetAddresses = (query?: string) => {
		return $api.post<Paginated<Address>>(
			query ? `/api/v1/addresses/filters?${query}` : '/api/v1/addresses/filters'
		);
	};

	createAddress = (value: CreateAddress) =>
		$api.post<CreateAddress>('/api/v1/addresses', value);

	deleteAddress = (id: number) => $api.delete(`/api/v1/addresses/${id}`);

	updateAddress = (id: number, values: CreateAddress) =>
		$api.patch<CreateAddress>(`/api/v1/addresses/${id}`, values);

	getAddress = (id: number | string) =>
		$api.get<Address>(`/api/v1/addresses/${id}`);
}
