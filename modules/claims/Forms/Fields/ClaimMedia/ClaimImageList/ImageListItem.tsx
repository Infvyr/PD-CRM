import {
	UploadResponse,
	ClaimImageType,
	ClaimImageFile
} from '@proovia-crm/crm-api-types';
import { Popconfirm, Progress, Input, Image } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { debounce } from 'lodash';
import { ChangeEvent, useMemo, useState } from 'react';
import placeholderImage from '../../../../../../public/assets/images/placeholder-100x100.jpeg';
import {
	DeleteIcon,
	ImageListItemWrapper,
	ImageNote,
	ImageWrapper
} from './ImageList.styles';

interface ListItemProps {
	file: ClaimImageFile;
	onDelete: (record: UploadFile<UploadResponse>) => void;
	type: ClaimImageType;
	onChange?: (file: ClaimImageFile) => void;
}

export const ImageListItem = ({
	file,
	onDelete,
	type,
	onChange = () => {}
}: ListItemProps) => {
	const [note, setNote] = useState(file.note || '');

	const triggerOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

	const handleOnNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
		file.note = e.target.value;
		triggerOnChange(file);
	};

	return (
		<ImageListItemWrapper>
			<Popconfirm
				title="Delete?"
				onConfirm={() => onDelete(file)}
				okText="Yes"
				cancelText="No"
				placement="topRight"
			>
				<DeleteIcon />
			</Popconfirm>
			<b>{type}</b>
			<ImageWrapper>
				{file.status === 'uploading' && (
					<div style={{ marginRight: '15px' }}>
						<span>Uploading... {file.percent}</span>
						<Progress percent={file.percent} size="small" />
					</div>
				)}
				{file.status === 'error' && (
					<div>
						<span className="red">Error: {file.name}</span>
						<Progress percent={file.percent} size="small" status="exception" />
					</div>
				)}
				{file.status === 'done' && (
					<Image
						width={100}
						height={100}
						alt={file.fileName}
						src={file.url || file.response?.url}
						fallback={placeholderImage.src}
						placeholder={
							<Image
								preview={false}
								src={placeholderImage.blurDataURL}
								width={100}
								alt={file.fileName}
							/>
						}
					/>
				)}
			</ImageWrapper>
			{file.error ? (
				<div>
					{file.error?.response?.data?.message ||
						'Something went wrong while uploading this file.'}
				</div>
			) : (
				<ImageNote rules={[{ max: 1000 }]}>
					<Input.TextArea
						value={note}
						autoSize={{ minRows: 4, maxRows: 6 }}
						onChange={handleOnNoteChange}
					/>
				</ImageNote>
			)}
		</ImageListItemWrapper>
	);
};
