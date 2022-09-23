import { Input } from 'antd';
import styled from 'styled-components';

export const StyledForm = styled(Input.Search)`
	max-width: 320px;
	width: 100%;

	.ant-input-group {
		display: inline-block;
	}

	.ant-input-search-button {
		display: none;
	}
`;
