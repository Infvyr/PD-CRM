import useSWR from 'swr';
import { ProfilesApi } from '../../../../api/profiles.api';
import { PaginateQueryConfig } from '../../../../../../dist/libs/crm-api-types/src/common/pagination';
import { Profile } from '@proovia-crm/crm-api-types';
import { useMemo } from 'react';
import { buildQueryOptions } from '../../../../utils/paginate.helper';

export const useProfiles = (config?: PaginateQueryConfig<Profile>) => {
	const query = useMemo(() => buildQueryOptions(config), [config]);

	const profilesApi = new ProfilesApi();
	const { data, error, ...rest } = useSWR(`/api/v1/profiles?${query}`, () =>
		profilesApi.getProfiles(query)
	);

	const loading = !data && !error;

	return { data: data?.data, loading, error, ...rest };
};
