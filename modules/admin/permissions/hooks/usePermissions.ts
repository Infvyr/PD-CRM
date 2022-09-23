import { PaginateQueryConfig, Permission } from '@proovia-crm/crm-api-types';
import { useMemo } from 'react';
import useSWR from 'swr';
import { PermissionsApi } from '../../../../api/permissions.api';
import { buildQueryOptions } from '../../../../utils/paginate.helper';

export const usePermissions = (config?: PaginateQueryConfig<Permission>) => {
	const query = useMemo(() => buildQueryOptions(config), [config]);

	const permissionsApi = new PermissionsApi();
	const { data, error, ...rest } = useSWR(`/api/v1/permissions?${query}`, () =>
		permissionsApi.getPermissions(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
