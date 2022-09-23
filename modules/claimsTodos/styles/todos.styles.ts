import styled from 'styled-components';
import { Drawer } from 'antd';

export const StyledDrawer = styled(Drawer)`
	@media (max-width: 1100px) {
		.claim-todo-drawer .ant-drawer-content-wrapper {
			width: 90vw !important;
		}
	}
`;
