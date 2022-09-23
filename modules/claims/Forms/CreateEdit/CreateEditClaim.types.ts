import {
	ClaimImage,
	ClaimImageFile,
	ClaimNote,
	ClaimNoteRowData,
	CreateClaim
} from '@proovia-crm/crm-api-types';
import { FormInstance } from 'antd';

export interface CreateEditClaimContext {
	edit: boolean;
	form?: FormInstance<CreatedEditClaimInitialValues>;
}

export type CreateEditClaimImage = ClaimImage & { uid: string };
export type CreateEditClaimNote = ClaimNote & { uid: string };
export interface CreatedEditClaimInitialValues
	extends Omit<CreateClaim, 'images' | 'notes'> {
	id: number;
	claimImages: ClaimImageFile[];
	claimNotes: ClaimNoteRowData[];
}
