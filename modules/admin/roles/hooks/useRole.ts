import { RolesApi } from '../../../../api/roles.api';
import useSWR from 'swr';

export const useRole = (id?: string | number) => {
	const rolesApi = new RolesApi();
	const { data, error, ...rest } = useSWR(
		id ? `/api/v1/roles/${id}` : null,
		() => rolesApi.getRole(id as number)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
