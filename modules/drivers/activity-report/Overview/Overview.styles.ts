import { Card, Row, Tabs } from 'antd';
import styled from 'styled-components';

export const StyledTabs = styled(Tabs)`
	&,
	.ant-tabs-content-top {
		height: 100%;
	}
`;

export const StyledExpWrapper = styled.div`
	margin-bottom: 0.5rem;
`;

export const StyledTaskTable = styled.div`
	.ant-table-row-expand-icon-cell {
		> span {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.ant-table-row-expand-icon {
		width: 30px;
		height: 30px;
		line-height: 30px;

		&:before {
			top: 14px;
		}
		&:after {
			left: 14px;
		}
	}
`;

export const StyledList = styled.ol`
	padding-left: 1rem;
	margin-bottom: 0;
	list-style-type: disclosure-closed;
`;

export const StyledCard = styled(Card)`
	& .ant-card-body {
		padding: 1rem;
	}
`;

export const StyledRow = styled(Row)`
	display: grid;
	grid-template-rows: auto 1fr;
	min-height: inherit;

	.ant-card-body {
		height: 100%;
	}

	.ant-col {
		&:empty {
			display: none;
		}
	}

	.ant-row + div:empty {
		display: none;
	}
`;
