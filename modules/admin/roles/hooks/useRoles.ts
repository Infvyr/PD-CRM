import { RolesApi } from '../../../../api/roles.api';
import useSWR from 'swr';
import { PaginateQueryConfig, Role } from '@proovia-crm/crm-api-types';
import { useMemo } from 'react';
import { buildQueryOptions } from '../../../../utils/paginate.helper';

export const useRoles = (config?: PaginateQueryConfig<Role>) => {
	const query = useMemo(() => buildQueryOptions(config), [config]);

	const rolesApi = new RolesApi();
	const { data, error, ...rest } = useSWR(`/api/v1/roles?${query}`, () =>
		rolesApi.getRoles(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
