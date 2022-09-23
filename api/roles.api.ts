import {
	CreateRole,
	Role,
	RoleTree,
	UpdateRole
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class RolesApi {
	getRoles(query?: string) {
		return $api.get<Paginated<Role>>(
			query ? `/api/v1/roles?${query}` : '/api/v1/roles/'
		);
	}

	getRole(id: number | string) {
		return $api.get<Role>(`/api/v1/roles/${id}`);
	}

	updateRole(id: number | string | undefined, data: UpdateRole) {
		if (id) {
			return $api.patch<Role>(`/api/v1/roles/${id}`, data);
		}
	}

	getRolesTree() {
		return $api.get<RoleTree[]>(`/api/v1/roles/hierarchy`);
	}

	createRole(role: CreateRole) {
		return $api.post<RoleTree[]>(`/api/v1/roles`, role);
	}

	deleteRole(id: number | string) {
		return $api.delete(`/api/v1/roles/${id}`);
	}
}
