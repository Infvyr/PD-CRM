import {
	PaginateQueryConfig,
	Warehouse,
	WarehouseLocation
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { WarehouseApi } from '../../../api/warehouse.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';

const useWarehouses = (config?: PaginateQueryConfig<Warehouse>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] = useState<Paginated<Warehouse>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const warehouseApi = useMemo(() => new WarehouseApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/warehouses',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => warehouseApi.getWarehouses(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<Warehouse>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return warehouseApi
				.updateFiltersAndGetWarehouses(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[warehouseApi, config, mutate]
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

const useWarehousesLocations = (
	config?: PaginateQueryConfig<WarehouseLocation>
) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] =
		useState<Paginated<WarehouseLocation>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const warehouseApi = useMemo(() => new WarehouseApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/warehouses-locations',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => warehouseApi.getWarehousesLocations(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<WarehouseLocation>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return warehouseApi
				.updateFiltersAndGetWarehousesLocations(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[warehouseApi, config, mutate]
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

export { useWarehouses, useWarehousesLocations };
