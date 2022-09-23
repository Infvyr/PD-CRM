import $api from './api';

export class ClaimImagesApi {
	deleteImage(claimId: number, imageId: number) {
		return $api.delete(`/api/v1/claims/${claimId}/images/${imageId}`);
	}
}
