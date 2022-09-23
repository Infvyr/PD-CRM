import useSWR from 'swr';
import { PermissionsApi } from '../../../../api/permissions.api';

export const usePermission = (id?: string | number) => {
	const permissionsApi = new PermissionsApi();
	const { data, error, ...rest } = useSWR(
		id ? `/api/v1/permissions/${id}` : null,
		() => permissionsApi.getPermission(+(id as string))
	);
	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
