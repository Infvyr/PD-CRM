import { UploadResponse } from '@proovia-crm/crm-api-types';
import { RcFile } from 'antd/lib/upload';
import { AxiosRequestConfig } from 'axios';
import $api from './api';

export class ImageApi {
	static uploadImage = async (
		file: string | RcFile | Blob,
		config?: AxiosRequestConfig
	) => {
		const formData = new FormData();
		formData.append('file', file);
		return $api.post<UploadResponse>(
			`/api/v1/images`,
			formData,
			config || {
				headers: { 'content-type': 'multipart/form-data' }
			}
		);
	};
}
