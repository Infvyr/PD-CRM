import {
	Claim,
	ClaimTodo,
	CreateClaim,
	CreateClaimTodo,
	UpdateClaim,
	UpdateClaimTodo
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class ClaimsApi {
	getClaims = (query?: string) =>
		$api.get<Paginated<Claim>>(
			query ? `/api/v1/claims?${query}` : '/api/v1/claims'
		);

	updateFiltersAndGetClaims = (query?: string) => {
		return $api.post<Paginated<Claim>>(
			query ? `/api/v1/claims/filters?${query}` : '/api/v1/claims/filters'
		);
	};

	getClaim = (id: number | string) => $api.get<Claim>(`/api/v1/claims/${id}`);

	deleteClaim = (id: number) => $api.delete(`/api/v1/claims/${id}`);

	createNewClaim = (newClaim: CreateClaim) =>
		$api.post('/api/v1/claims', newClaim);

	updateClaim = (id: number, updateClaim: UpdateClaim) =>
		$api.patch<Claim>(`/api/v1/claims/${id}`, updateClaim);

	updateClaimTodoStatus = (id: number) =>
		$api.patch<ClaimTodo>(`/api/v1/claim-todos/${id}/complete`);

	createClaimTodo = (value: CreateClaimTodo) =>
		$api.post('/api/v1/claim-todos', value);

	updateClaimTodo = (id: number, value: UpdateClaimTodo) =>
		$api.patch<ClaimTodo>(`/api/v1/claim-todos/${id}`, value);

	getClaimTodo = (id: number | string) =>
		$api.get<ClaimTodo>(`/api/v1/claim-todos/${id}`);
}
