import { UploadImageFile, UploadResponse } from '@proovia-crm/crm-api-types';
import { Image, Upload, UploadProps } from 'antd';
import { ItemRender, UploadFile } from 'antd/lib/upload/interface';
import { FunctionComponent, useState } from 'react';
import { ImageApi } from '../../../../../../api/image.api';
import { InboxOutlined } from '@ant-design/icons';

interface ImageTableProps {
	value?: UploadImageFile[];
	initialValue?: UploadImageFile[];
	onChange?: (value: UploadImageFile[]) => void;
	itemRender?: ItemRender<UploadResponse>;
}

export const ClaimImageList: FunctionComponent<ImageTableProps> = ({
	value = [],
	initialValue = [],
	onChange,
	itemRender
}) => {
	const [fileList, setFileList] =
		useState<UploadFile<UploadResponse>[]>(initialValue);

	const handleUploadImage: UploadProps<UploadResponse>['customRequest'] =
		async (options) => {
			const { onSuccess, onError, file, onProgress } = options;
			const config = {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (event: { loaded: number; total: number }) => {
					onProgress?.({
						percent: +((event.loaded / event.total) * 100).toFixed(2)
					});
				}
			};
			try {
				const { data: image } = await ImageApi.uploadImage(file, config);
				onSuccess?.(image);
			} catch (err) {
				onError?.(err);
			}
		};

	const handleOnChange: UploadProps<UploadResponse>['onChange'] = ({
		fileList
	}) => {
		const newFileList = [...fileList];
		setFileList(newFileList);
		onChange?.(newFileList);
	};

	return (
		<Image.PreviewGroup>
			<Upload.Dragger
				fileList={value || fileList}
				showUploadList={true}
				customRequest={handleUploadImage}
				onChange={handleOnChange}
				itemRender={itemRender}
				multiple
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p>Click or drag files to this area to upload</p>
			</Upload.Dragger>
		</Image.PreviewGroup>
	);
};
