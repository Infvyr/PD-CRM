import $api from './api';

export class ClaimNotesApi {
	deleteImage(claimId: number, noteId: number) {
		return $api.delete(`/api/v1/claims/${claimId}/notes/${noteId}`);
	}
}
