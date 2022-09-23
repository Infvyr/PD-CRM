import {
	DriverKarma,
	DriverKarmaPoints,
	DriverKarmas,
	DriversKarmaRule,
	DriversKarmaRules
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class DriversKarmaApi {
	createDriverKarma = (id: number, value: DriverKarma) =>
		$api.post(`/api/v1/drivers/${id}/karma`, value);

	createDriverKarmaRule = (value: DriversKarmaRule) =>
		$api.post(`/api/v1/drivers/karma/rules`, value);

	getKarmaRules = (query?: string) =>
		$api.get<Paginated<DriversKarmaRules>>(
			query
				? `/api/v1/drivers/karma/rules?${query}`
				: '/api/v1/drivers/karma/rules'
		);

	updateFiltersAndGetDriverKarmaRules = (query?: string) => {
		return $api.post<Paginated<DriversKarmaRules>>(
			query
				? `/api/v1/drivers/karma/rules?${query}`
				: '/api/v1/drivers/karma/rules'
		);
	};

	getKarmas = (query?: string) =>
		$api.get<Paginated<DriverKarmas>>(
			query ? `/api/v1/drivers/karma?${query}` : '/api/v1/drivers/karma'
		);

	updateFiltersAndGetDriverKarmas = (query?: string) => {
		return $api.post<Paginated<DriverKarmas>>(
			query
				? `/api/v1/drivers/karma/filters?${query}`
				: '/api/v1/drivers/karma/filters'
		);
	};

	getKarmaPoints = (query?: string) =>
		$api.get<Paginated<DriverKarmaPoints>>(
			query
				? `api/v1/drivers/karma/points?${query}`
				: 'api/v1/drivers/karma/points'
		);

	updateFiltersAndGetDriverKarmaPoints = (query?: string) => {
		return $api.post<Paginated<DriverKarmaPoints>>(
			query
				? `/api/v1/drivers/karma/points/filters?${query}`
				: '/api/v1/drivers/karma/points/filters'
		);
	};

	getDriverKarma = (id: number, query?: string) =>
		$api.get<Paginated<DriverKarmas>>(
			query
				? `api/v1/drivers/${id}/karma?${query}`
				: `api/v1/drivers/${id}/karma`
		);

	updateFiltersAndGetDriverKarma = (id: number, query?: string) => {
		return $api.get<Paginated<DriverKarmas>>(
			query
				? `/api/v1/drivers/karma/${id}/filters?${query}`
				: `/api/v1/drivers/karma/${id}/filters`
		);
	};
}
