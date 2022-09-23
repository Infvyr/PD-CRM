import { Customer, PaginateQueryConfig } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { CustomersApi } from '../../../api/customers.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';

const useCustomers = (config?: PaginateQueryConfig<Customer>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] = useState<Paginated<Customer>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const customerApi = useMemo(() => new CustomersApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/customers',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => customerApi.getCustomers(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<Customer>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return customerApi
				.updateFiltersAndGetCustomers(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[customerApi, config, mutate]
	);

	const loading = (!data && !error) || isUpdatingFilters;

	return {
		data: data || optimisticData,
		error,
		loading,
		mutate,
		updateFilters,
		...rest
	};
};

const useCustomer = (id?: number) => {
	const { query } = useRouter();
	const customersApi = new CustomersApi();
	const uid = id || (query.customerId as string);

	const { data, error, ...rest } = useSWR(
		query.customerId && `/api/v1/customers/${uid}`,
		() => customersApi.getCustomer(uid)
	);
	const loading = !data && !error;
	return { data: data?.data, error, loading, ...rest };
};

export { useCustomers, useCustomer };
