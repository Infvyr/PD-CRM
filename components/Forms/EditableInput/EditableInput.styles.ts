import { Input } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
	.ant-form-item-explain {
		margin-top: -10px;
	}
`;

export const StyledPasswordInput = styled(Input.Password)`
	min-width: 300px;

	&.ant-input-affix-wrapper-borderless {
		padding-left: 0;
	}

	&:focus {
		box-shadow: none;
	}

	.anticon-edit,
	.anticon-edit:hover {
		color: var(--brand-color);
	}
`;
