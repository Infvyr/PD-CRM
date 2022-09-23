import useSWR from 'swr';
import { ProfilesApi } from '../../../../api/profiles.api';

export const useProfile = (id: string | number) => {
	const profilesApi = new ProfilesApi();
	const shouldFetch = !isNaN(+id);

	const { data, error, ...rest } = useSWR(
		shouldFetch ? `/api/v1/profile/${id}` : null,
		() => profilesApi.getProfile(+id)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
