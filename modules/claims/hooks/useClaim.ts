import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ClaimsApi } from '../../../api/claims.api';

export const useClaim = (id?: number) => {
	const { query } = useRouter();
	const claimApi = new ClaimsApi();
	const uid = id || (query.claimID as string);

	const { data, error, ...rest } = useSWR(
		query.claimID ? `/api/v1/claim/${uid}` : null,
		() => claimApi.getClaim(uid)
	);
	const loading = !data && !error;
	return { data: data?.data, error, loading, ...rest };
};
