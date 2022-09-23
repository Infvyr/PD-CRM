import { css } from 'styled-components';

export const DropDownMenuStyles = css`
	.dropdown-menu-user {
		top: calc(var(--header-height) + 7px) !important;

		.ant-dropdown-menu {
			padding: 0;
			background-color: var(--brand-color);

			&-item-group-title {
				padding: 0;
			}

			&-item,
			&-item-group {
				line-height: unset;

				&:hover {
					background-color: var(--white-color);

					a,
					button {
						color: var(--brand-color);
					}
				}

				.ant-dropdown-menu-title-content {
					display: inline-flex;
					align-items: center;
					width: 100%;
				}

				a,
				button {
					padding: 5px 12px !important;
					display: block;
					width: 100%;
					line-height: 1.5;
					color: var(--white-color);
					border: 0;
				}
			}
		}
	}
`;
