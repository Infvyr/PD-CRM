import { css } from 'styled-components';

export const TableStyles = css`
	.ant-table-small-default {
		background-color: var(--white-color);

		&.ant-table-body--heightY {
			.ant-table-body {
				max-height: calc(
					100vh - var(--header-height) - var(--fixed-pagination-height) -
						var(--page-header-height) - 82px
				);
			}
		}

		&.ant-table--fixed-pagination {
			min-height: calc(
				100vh - var(--header-height) - var(--page-header-height) -
					var(--fixed-pagination-height) - 35px
			);
		}

		.ant-table.ant-table-small {
			.ant-table-tbody {
				> tr {
					.td {
						padding: 8px 8px;
					}
				}
			}
		}

		&.ant-table-small {
			.ant-table-tbody {
				.ant-btn-icon-only {
					padding: 0;
				}

				> tr {
					> .table-cell-actions {
						padding: 0;
					}
					> td:not(.table-cell-actions) {
						padding: 15px;
					}
				}
			}
		}
	}

	.ant-table--clickable {
		.ant-table-cell {
			cursor: pointer;
		}
		.unclickable {
			padding: 0 5px;
			cursor: text;
		}
	}

	.ant-table--context-menu {
		.ant-table-tbody > tr > td {
			padding: 0 !important;
		}

		.table--context-menu {
			padding: 15px;
		}
	}
	.table--context-menu-overlay {
		.ant-dropdown-menu {
			padding-top: 0;
			padding-bottom: 0;

			.ant-dropdown-menu-item {
				padding: 0;

				&:hover {
					button {
						color: var(--brand-color);
					}
				}
			}

			button {
				color: #222;
			}
		}

		&.hide {
			display: none;
		}
	}

	.ant-table--bottom-space {
		.ant-table {
			margin-bottom: 5rem;
		}
	}

	.ant-table--fixed-pagination {
		min-height: calc(
			100vh - var(--header-height) - var(--page-header-height) -
				var(--ant-table-title-height)
		);

		.ant-spin-nested-loading > div > .ant-spin {
			max-height: initial;
		}

		/* start test feature */
		&.ant-table-wrapper {
			.ant-spin-nested-loading,
      .ant-spin-container,
      .ant-table-empty,
        //.ant-table-small,
      .ant-table-empty .ant-table-container,
      .ant-table-empty .ant-table-content,
      .ant-table-empty .ant-table-body,
      .ant-table-empty table {
				min-height: inherit;
			}
		}
		/* end test feature */

		.ant-table {
			> .ant-table-title {
				//position: sticky;
				//top: calc(var(--header-height) + var(--page-header-height));
				z-index: 4;
				background-color: var(--light-color);

				~ .ant-table-container {
					> .ant-table-sticky-holder {
						top: calc(
							var(--header-height) + var(--page-header-height) +
								var(--ant-table-title-height)
						) !important;
					}
				}
			}
		}

		.ant-table-pagination.ant-pagination {
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			margin: 0;
			padding: 16px;
			z-index: 6;
			background-color: var(--light-color);
			box-shadow: 0 -2px 2px -1px rgb(0 0 0 / 6%);
		}

		.ant-table-body {
			overflow-y: scroll !important;
			max-height: calc(
				100vh - var(--header-height) - var(--fixed-pagination-height) -
					var(--page-header-height) - 130px
			);
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
`;
