import { CreateCustomer, Customer } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class CustomersApi {
	getCustomers = (query?: string) =>
		$api.get<Paginated<Customer>>(
			query ? `/api/v1/customers?${query}` : '/api/v1/customers'
		);

	updateFiltersAndGetCustomers = (query?: string) => {
		return $api.post<Paginated<Customer>>(
			query ? `/api/v1/customers/filters?${query}` : '/api/v1/customers/filters'
		);
	};

	deleteCustomer = (id: number) => $api.delete(`/api/v1/customers/${id}`);

	createCustomer = (value: CreateCustomer) =>
		$api.post<CreateCustomer>('/api/v1/customers', value);

	getCustomer = (id: number | string) =>
		$api.get<Customer>(`/api/v1/customers/${id}`);

	updateCustomer = (id: number, values: CreateCustomer) =>
		$api.patch<CreateCustomer>(`/api/v1/customers/${id}`, values);
}
