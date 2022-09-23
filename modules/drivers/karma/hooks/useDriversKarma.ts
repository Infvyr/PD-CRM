import {
	DriverKarmaPoints,
	DriverKarmas,
	DriversKarmaRules,
	PaginateQueryConfig
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { DriversKarmaApi } from '../../../../api/drivers.karma.api';
import { buildQueryOptions } from '../../../../utils/paginate.helper';

const useDriversKarmaRules = (
	config?: PaginateQueryConfig<DriversKarmaRules>
) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] =
		useState<Paginated<DriversKarmaRules>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const driversKarmaApi = useMemo(() => new DriversKarmaApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/drivers/karma/rules',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => driversKarmaApi.getKarmaRules(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<DriversKarmaRules>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return driversKarmaApi
				.updateFiltersAndGetDriverKarmaRules(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[driversKarmaApi, config, mutate]
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

const useDriversKarma = (config?: PaginateQueryConfig<DriverKarmas>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] =
		useState<Paginated<DriverKarmas>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const driversKarmaApi = useMemo(() => new DriversKarmaApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/drivers/karma',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => driversKarmaApi.getKarmas(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<DriverKarmas>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return driversKarmaApi
				.updateFiltersAndGetDriverKarmas(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[driversKarmaApi, config, mutate]
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

const useDriversKarmaPoints = (
	config?: PaginateQueryConfig<DriverKarmaPoints>
) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] =
		useState<Paginated<DriverKarmaPoints>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const driversKarmaApi = useMemo(() => new DriversKarmaApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'api/v1/drivers/karma/points',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => driversKarmaApi.getKarmaPoints(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<DriverKarmaPoints>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return driversKarmaApi
				.updateFiltersAndGetDriverKarmaPoints(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[driversKarmaApi, config, mutate]
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

const useDriverKarma = (
	id: number,
	config?: PaginateQueryConfig<DriverKarmas>
) => {
	const { query: routerQuery } = useRouter();
	const uid = id || (routerQuery.driverID as string);
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] =
		useState<Paginated<DriverKarmas>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const driversKarmaApi = useMemo(() => new DriversKarmaApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			`/api/v1/drivers/${uid}/karma`,
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => driversKarmaApi.getDriverKarma(+uid, query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<DriverKarmas>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return driversKarmaApi
				.updateFiltersAndGetDriverKarma(+uid, query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[driversKarmaApi, config, mutate]
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

export {
	useDriversKarmaRules,
	useDriversKarma,
	useDriversKarmaPoints,
	useDriverKarma
};
