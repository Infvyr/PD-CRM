import styled from 'styled-components';
import { Descriptions } from 'antd';

export const StyledDescription = styled(Descriptions)`
	&.ant-descriptions-bordered {
		.ant-descriptions-row {
			display: grid;
			grid-template-columns: 150px 1fr;
		}

		.ant-descriptions-item-label {
			font-weight: bold;
		}
	}
`;
