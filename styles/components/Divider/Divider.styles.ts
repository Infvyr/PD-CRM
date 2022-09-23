import { css } from 'styled-components';

export const DividerStyles = css`
	.ant-divider-horizontal.ant-divider-with-text-left::before {
		content: none;
	}
	.ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text {
		padding-left: 0;
	}
`;
