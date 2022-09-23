import styled from 'styled-components';
import { Menu } from 'antd';

export const StyledSider = styled.aside`
	position: fixed;
	width: 300px;
	height: calc(100% - var(--header-height));
	left: 0;
	//top: calc(var(--header-height) + var(--page-header-height) + 16px);
	top: var(--header-height);
	background-color: var(--bg-color);
	box-shadow: 4px 0 3px -2px rgb(0 0 0 / 6%);

	@media (max-width: 992px) {
		position: static;
		width: 100%;
		box-shadow: none;

		.ant-menu-item-group {
			.ant-menu-item-group-list {
				display: flex;
				overflow-x: scroll;
				scroll-snap-type: x mandatory;

				.ant-menu-item {
					flex: 0 0 20%;
				}
			}
		}
	}
`;

export const StyledSideMenu = styled(Menu)`
	background-color: var(--bg-color);
	color: var(--side-menu-color);
	border-right: 0;

	&& .ant-menu-item-selected {
		background-color: var(--white-color);
		color: var(--brand-color);
	}

	.ant-menu-item {
		&:after {
			border-right: 3px solid var(--brand-color);
		}

		&:active {
			background: initial;
		}

		&:hover {
			color: var(--brand-color);
		}
	}
`;
