import { Claim, PaginateQueryConfig } from '@proovia-crm/crm-api-types';
import { useMemo, useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { ClaimsApi } from '../../../api/claims.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';
import { Paginated } from 'nestjs-paginate';

export const useClaims = (config?: PaginateQueryConfig<Claim>) => {
	const [isUpdatingFilters, setIsUpdatingFilters] = useState(false);
	const [optimisticData, setOptimisticData] = useState<Paginated<Claim>>();

	const query = useMemo(() => buildQueryOptions(config), [config]);

	const claimsApi = useMemo(() => new ClaimsApi(), []);

	const { data, error, mutate, ...rest } = useSWR(
		[
			'api/v1/claims',
			config?.pagination?.current || 1,
			config?.search,
			config?.sorter
		],
		() => claimsApi.getClaims(query).then((resp) => resp.data)
	);

	useEffect(() => {
		if (data) {
			setOptimisticData(data);
		}
	}, [data]);

	const updateFilters = useCallback(
		(updateConfig?: PaginateQueryConfig<Claim>) => {
			const query = buildQueryOptions({ ...config, ...updateConfig });
			setIsUpdatingFilters(true);
			return claimsApi
				.updateFiltersAndGetClaims(query)
				.then((resp) => {
					mutate(resp.data, {
						rollbackOnError: true,
						revalidate: false
					});
					return resp.data;
				})
				.finally(() => setIsUpdatingFilters(false));
		},
		[claimsApi, config, mutate]
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
