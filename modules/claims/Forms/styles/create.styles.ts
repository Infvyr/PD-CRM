import styled from 'styled-components';
import { Form, Space } from 'antd';

export const StyledFormItem = styled(Form.Item)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.ant-form-item-control,
	.ant-input-number-group-wrapper {
		width: 100%;
	}
`;

export const StyledSpace = styled(Space)`
	width: 100%;

	.ant-space-item {
		&:first-child {
			width: 100%;
		}
		&:last-child {
			position: relative;
			top: 4px;
		}
	}
`;
