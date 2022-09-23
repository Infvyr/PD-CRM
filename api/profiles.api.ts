import {
	CreateProfile,
	Profile,
	UpdateProfile
} from '@proovia-crm/crm-api-types';
import { Paginated } from 'nestjs-paginate';
import $api from './api';

export class ProfilesApi {
	getProfiles(query?: string) {
		return $api.get<Paginated<Profile>>(
			query ? `/api/v1/profiles?${query}` : '/api/v1/profiles'
		);
	}

	getProfile(id: number | string) {
		return $api.get<Profile>(`/api/v1/profiles/${id}`);
	}

	createProfile(profile: CreateProfile) {
		return $api.post<Profile>('/api/v1/profiles', profile);
	}

	updateProfile(id: string | number, updateProfile: UpdateProfile) {
		return $api.patch(`/api/v1/profiles/${id}`, updateProfile);
	}

	deleteProfile(id: string | number) {
		return $api.delete(`/api/v1/profiles/${id}`);
	}
}
