import { Address, PaginateQueryConfig } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { AddressesApi } from '../../../api/addresses.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';

const useAddresses = (config?: PaginateQueryConfig<Address>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] = useState<Paginated<Address>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const addressApi = useMemo(() => new AddressesApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'/api/v1/addresses',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => addressApi.getAddresses(query).then((resp) => resp.data)
	);

	useEffect(() => data && setOptimisticData(data), [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<Address>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return addressApi
				.updateFiltersAndGetAddresses(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[addressApi, config, mutate]
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

const useAddress = (id?: number) => {
	const { query } = useRouter();
	const addressApi = new AddressesApi();
	const uid = id || (query.addressId as string);

	const { data, error, ...rest } = useSWR(
		query.addressId && `/api/v1/addresses/${uid}`,
		() => addressApi.getAddress(uid)
	);
	const loading = !data && !error;
	return { data: data?.data, error, loading, ...rest };
};

export { useAddresses, useAddress };
