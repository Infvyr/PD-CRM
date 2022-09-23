import {
	ClaimImage,
	ClaimImageFile,
	ClaimImageType
} from '@proovia-crm/crm-api-types';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { nanoid } from 'nanoid';

export class ClaimImageAdapter implements ClaimImageFile {
	constructor(claimImage: ClaimImage) {
		this.id = claimImage.id;
		this.name = claimImage.fileName;
		this.uid = nanoid();
		this.url = claimImage.url;
		this.status = 'done';
		this.note = claimImage.note;
		this.type = claimImage.type;
	}

	id?: number | undefined;
	uid: string;
	name: string;
	fileName?: string | undefined;
	url?: string | undefined;
	status?: UploadFileStatus | undefined;
	note?: string;
	type?: ClaimImageType;
}
