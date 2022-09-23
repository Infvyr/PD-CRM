import { CreateUser, UpdateUser, User } from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class UsersApi {
	getUser(id: number | string) {
		return $api.get<User>(`/api/v1/users/${id}`);
	}

	getUsers(query?: string) {
		return $api.get<Paginated<User>>(
			query ? `/api/v1/users?${query}` : '/api/v1/users'
		);
	}

	createUser(data: CreateUser) {
		return $api.post<User>(`/api/v1/users`, data);
	}

	updateUser(id: number | string | undefined, data: UpdateUser) {
		if (id) {
			return $api.patch<User>(`/api/v1/users/${id}`, data);
		}
	}

	deleteUser(id?: string) {
		if (id) {
			return $api.delete(`/api/v1/users/${id}`);
		}
	}
}
