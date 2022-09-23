import {
	ClaimImageFile,
	ClaimImageType,
	UpdateClaimImage
} from '@proovia-crm/crm-api-types';

export class ClaimImageFileAdapter implements UpdateClaimImage {
	constructor(claimImageFile: ClaimImageFile) {
		this.id = claimImageFile.id;
		this.type = claimImageFile.type || ClaimImageType.UNKNOWN;
		this.note = claimImageFile.note || '';
		this.fileName = claimImageFile.fileName;
		this.imageId = claimImageFile.imageId || claimImageFile.response?.id;
	}
	id?: number;
	type: ClaimImageType;
	note: string;
	fileName?: string;
	imageId?: number;
}
