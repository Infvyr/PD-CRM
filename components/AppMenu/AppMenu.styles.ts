import styled from 'styled-components';
import { Menu } from 'antd';

export const StyledMenu = styled(Menu)`
	& {
		border-bottom: 0;
		background-color: var(--brand-color);
		color: var(--white-color);
	}

	&:not(.ant-menu-dark) {
		> .ant-menu-submenu-open,
		> .ant-menu-submenu-selected {
			color: var(--brand-color);
			background-color: var(--white-color);
		}
	}

	// parent menu
	.mainMenuItem {
		&.ant-menu-submenu {
			padding-left: 0;
			padding-right: 0;
		}

		&:hover {
			background-color: var(--white-color);
			color: var(--brand-color);
		}

		.ant-menu-title-content {
			padding-left: 15px;
			padding-right: 15px;
			display: block;
		}
	}

	.ant-menu-submenu {
		&:after {
			content: none;
		}
	}
`;
