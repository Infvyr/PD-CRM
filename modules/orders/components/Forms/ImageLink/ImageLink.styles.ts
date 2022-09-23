import { Space } from 'antd';
import styled, { css } from 'styled-components';

const Flex = css`
	display: flex;
	align-items: center;

	&:not(:last-of-type) {
		margin-bottom: 10px;
	}
`;

export const StyledSpace = styled(Space)`
	${Flex}

	.ant-space-item {
		&:first-child {
			flex: 1;
		}
	}

	.ant-form-item {
		margin-bottom: 0;
	}
`;

export const StyledLabel = styled.label`
	margin-bottom: 8px;
	display: inline-block;
`;
