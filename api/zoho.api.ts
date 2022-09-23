import {
	ZohoFindOrdersQuery,
	ZohoFindTasksQuery,
	ZohoOrder
} from '@proovia-crm/crm-api-types';
import $api from './api';

export class ZohoApi {
	findOrder = (query: ZohoFindOrdersQuery) =>
		$api.get<ZohoOrder>(`/api/v1/zoho/orders`, { params: query });

	findTasks = (query: ZohoFindTasksQuery) =>
		$api.get(`/api/v1/zoho/tasks`, { params: query });
}
