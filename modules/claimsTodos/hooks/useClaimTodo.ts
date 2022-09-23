import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ClaimsApi } from '../../../api/claims.api';

export const useClaimTodo = (id?: number) => {
	const { query } = useRouter();
	const claimApi = new ClaimsApi();
	const uid = id || (query.todoId as string);

	const { data, ...rest } = useSWR(
		query.todoId ? `/api/v1/claim-todos/${uid}` : null,
		() => claimApi.getClaimTodo(uid)
	);
	return { data: data?.data, ...rest };
};
