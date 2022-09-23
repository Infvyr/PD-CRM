import { css } from 'styled-components';

export const AppMenuStyles = css`
	// override ant-menu-*-selected styles
	.nCmIR {
		// nCmIR is body class added within _app
		.ant-menu {
			&:not(.ant-menu-dark) {
				> .ant-menu-submenu-open,
				> .ant-menu-submenu-selected {
					background-color: var(--brand-color) !important;
					color: var(--white-color) !important;
				}
			}
			.ant-menu-submenu-title:hover {
				color: var(--brand-color) !important;
				background-color: var(--white-color) !important;
			}
		}
	}

	.mainMenuSub {
		.ant-menu-sub {
			background-color: var(--brand-color);

			.ant-menu-item {
				margin-top: 0;
				margin-bottom: 0;
				padding-left: 0;
				padding-right: 0;

				&.ant-menu-item-selected {
					background-color: inherit;
				}

				.ant-menu-title-content {
					display: block;

					a {
						padding-left: 15px;
						padding-right: 15px;
						display: inherit;
					}
				}

				a {
					color: var(--white-color);

					&:hover {
						background-color: var(--white-color);
						color: var(--brand-color);
					}
				}
			}
		}
	}
`;
