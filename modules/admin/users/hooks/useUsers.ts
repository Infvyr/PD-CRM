import useSWR from 'swr';
import { UsersApi } from '../../../../api/users.api';
import { PaginateQueryConfig } from '../../../../../../dist/libs/crm-api-types/src/common/pagination';
import { User } from '@proovia-crm/crm-api-types';
import { useMemo } from 'react';
import { buildQueryOptions } from '../../../../utils/paginate.helper';

export const useUsers = (config?: PaginateQueryConfig<User>) => {
	const query = useMemo(() => buildQueryOptions(config), [config]);

	const userApi = new UsersApi();
	const { data, error, ...rest } = useSWR(`/api/v1/users?${query}`, () =>
		userApi.getUsers(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
