import { Order, PaginateQueryConfig } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { OrderApi } from '../../../api/orders.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';

const useOrders = (config?: PaginateQueryConfig<Order>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] = useState<Paginated<Order>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const orderApi = useMemo(() => new OrderApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/orders',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => orderApi.getOrders(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<Order>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return orderApi
				.updateFiltersAndGetOrders(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[orderApi, config, mutate]
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

export { useOrders };
