import { CreatePermission, Permission } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class PermissionsApi {
	getPermissions(query?: string) {
		return $api.get<Paginated<Permission>>(
			query ? `/api/v1/permissions?${query}` : '/api/v1/permissions'
		);
	}

	getPermission(id: string | number) {
		return $api.get<Permission>(`/api/v1/permissions/${id}`);
	}

	updatePermission(id: number | string | undefined, data: unknown) {
		if (id) {
			return $api.patch<Permission>(`/api/v1/permissions/${id}`, data);
		}
	}

	createPermission(permission: CreatePermission) {
		return $api.post<Paginated<Permission>>(`/api/v1/permissions`, permission);
	}

	deletePermission(id: number | string) {
		return $api.delete(`/api/v1/permissions/${id}`);
	}
}
