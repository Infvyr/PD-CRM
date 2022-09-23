import {
	CompletedLoadTask,
	Driver,
	DriverTask,
	VanCheck
} from '@proovia-crm/crm-api-types';
import moment from 'moment';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

const BACKEND_DATE_FORMAT = 'YYYY-MM-DD';

export class DriversApi {
	getDrivers = async ({ query, url }: { query?: string; url?: string }) => {
		if (url) {
			return $api.get<Paginated<Driver>>(url);
		}

		return $api.get<Paginated<Driver>>(
			query ? `/api/v1/drivers?${query}` : `/api/v1/drivers`
		);
	};

	getDriver = (id: number | string) =>
		$api.get<Driver>(`/api/v1/drivers/${id}`);

	getDriverVanChecks = async (id: number, selectedDate: moment.Moment) => {
		return $api.get<Paginated<VanCheck>>(
			`/api/v1/drivers/${id}/van-checks?limit=1&sortBy=createdAt:DESC&filter.createdAt=${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);
	};

	getDriverLoadTasks = async (id: number, selectedDate: moment.Moment) =>
		$api.get<Paginated<DriverTask>>(
			`/api/v1/drivers/${id}/load-tasks?limit=50&sortBy=createdAt:DESC&filter.createdAt=${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);

	getDriverUnloadTasks = async (id: number, selectedDate: moment.Moment) =>
		$api.get<Paginated<DriverTask>>(
			`/api/v1/drivers/${id}/unload-tasks?limit=40&sortBy=createdAt:DESC&filter.createdAt=${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);

	getDriverCompletedLoadTasks = async (
		id: number,
		selectedDate: moment.Moment
	) =>
		$api.get<Paginated<CompletedLoadTask>>(
			`/api/v1/drivers/${id}/completed-loads?limit=1&filter.startActionAt=${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);

	getDriverCompletedUnloadTasks = async (
		id: number,
		selectedDate: moment.Moment
	) =>
		$api.get<Paginated<CompletedLoadTask>>(
			`/api/v1/drivers/${id}/completed-unloads?limit=1&filter.startActionAt==${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);

	getDriverTasks = async (id: number, selectedDate: moment.Moment) =>
		$api.get<Paginated<DriverTask>>(
			`/api/v1/drivers/${id}/tasks?&sortBy=createdAt:DESC&filter.createdAt=${(
				selectedDate ?? moment()
			).format(BACKEND_DATE_FORMAT)}`
		);

	getDriversList = async () =>
		$api.get<Paginated<Driver>>('/api/v1/drivers?limit=10000');
}
