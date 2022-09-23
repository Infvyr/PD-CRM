import { UsersApi } from '../../../../api/users.api';
import useSWR from 'swr';

export const useUser = (id?: string) => {
	const userApi = new UsersApi();
	const { data, error, ...rest } = useSWR(
		id ? `/api/v1/users/${id}` : null,
		() => userApi.getUser(id as string)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
