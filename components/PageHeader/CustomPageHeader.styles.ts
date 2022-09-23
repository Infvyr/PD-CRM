import styled from 'styled-components';
import { PageHeader } from 'antd';

export const StyledPageHeader = styled(PageHeader)`
	padding: 5px 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	z-index: 4;
	position: fixed;
	top: var(--header-height);
	left: 0;
	right: 0;
	background-color: var(--white-color);

	.ant-page-header-content:empty {
		padding: 0;
	}

	@media (max-width: 992px) {
		left: 0 !important;
	}
`;
