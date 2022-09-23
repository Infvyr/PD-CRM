import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import $api from '../../../api/api';
import { DriversApi } from '../../../api/drivers.api';
import { buildQueryOptions } from '../../../utils/paginate.helper';
import {
	Driver,
	PaginatedDrivers,
	PaginateQueryConfig
} from '@proovia-crm/crm-api-types';

const fetchDrivers = async (url: string) => {
	try {
		const { data } = await $api.get<PaginatedDrivers>(url);
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const useDrivers = () =>
	useSWRImmutable(`api/v1/drivers?limit=10000`, fetchDrivers);

export const useDriver = (id?: number | string) => {
	const { query } = useRouter();
	const driversAPI = new DriversApi();
	const uid = id || (query.driverID as string);

	const { data, error, ...rest } = useSWR(
		query.driverID ? `/api/v1/drivers/${uid}` : null,
		() => driversAPI.getDriver(uid)
	);
	const loading = !data && !error;
	return { data: data?.data, error, loading, ...rest };
};

export const useDriversActivity = (config?: PaginateQueryConfig<Driver>) => {
	const query = useMemo(() => buildQueryOptions(config), [config]);

	const fetcher = useCallback(async (query?: string) => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDrivers({
			query: `${query}&filter.isActive=1`
		});
		return data;
	}, []);

	const { data, error, ...rest } = useSWR(
		`api/v1/drivers?${query}`,
		() => fetcher(query),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverVanCheck = (id: number, selectedDate: moment.Moment) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();

		const { data } = await driversAPI.getDriverVanChecks(id, selectedDate);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/van-checks?limit=1&sortBy=createdAt:DESC&filter.createdAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverLoadTasks = (id: number, selectedDate: moment.Moment) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDriverLoadTasks(id, selectedDate);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/load-tasks?limit=50&sortBy=tripSequence:DESC&filter.createdAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverUnloadTasks = (
	id: number,
	selectedDate: moment.Moment
) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDriverUnloadTasks(id, selectedDate);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/unload-tasks?limit=40&sortBy=tripSequence:DESC&filter.createdAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverCompletedLoadTasks = (
	id: number,
	selectedDate: moment.Moment
) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDriverCompletedLoadTasks(
			id,
			selectedDate
		);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/completed-loads?limit=1&filter.startActionAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverCompletedUnloadTasks = (
	id: number,
	selectedDate: moment.Moment
) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDriverCompletedUnloadTasks(
			id,
			selectedDate
		);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/completed-unloads?limit=1&filter.startActionAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};

export const useDriverTasks = (id: number, selectedDate: moment.Moment) => {
	const fetcher = useCallback(async () => {
		const driversAPI = new DriversApi();
		const { data } = await driversAPI.getDriverTasks(id, selectedDate);
		return data;
	}, [selectedDate, id]);

	const { data, error, ...rest } = useSWR(
		`/api/v1/drivers/${id}/tasks?&sortBy=tripSequence:ASC&filter.createdAt=${selectedDate}`,
		() => fetcher(),
		{ revalidateOnFocus: false }
	);
	const loading = !data && !error;

	return { data, error, loading, ...rest };
};
