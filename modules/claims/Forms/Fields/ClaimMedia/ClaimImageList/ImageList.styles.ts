import styled from 'styled-components';
import { Upload } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

export const StyledUpload = styled(Upload)`
	.ant-upload-list-picture-card-container {
		width: 100%;
		height: auto;
	}
`;

export const ImageListItemWrapper = styled.div`
	display: flex;
	border: 1px solid #d9d9d9;
	margin-bottom: 8px;
	padding: 8px;
	border-radius: 2px;
	gap: 12px;
	align-items: center;
	flex-wrap: wrap;
`;

export const DeleteIcon = styled(DeleteOutlined)`
	color: red;
`;

export const ImageWrapper = styled.div`
	max-width: 180px;
	overflow: hidden;
`;

export const ImageNote = styled(FormItem)`
	margin-bottom: 0;
	flex-grow: 1;
`;
