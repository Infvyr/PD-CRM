import styled from 'styled-components';

export const StyledListHeader = styled.header`
	display: grid;
	grid-template-columns: 0.5fr 1fr;
	grid-gap: 0 1rem;

	span {
		text-align: right;
		font-size: 1rem;
	}
`;

export const StyledListWrapper = styled.div`
	.ant-spin-nested-loading {
		margin-top: 1rem;
	}

	@media screen and (max-width: 992px) {
		.ant-spin-container {
			> .ant-row {
				> div {
					max-width: 50% !important;
					width: 50% !important;
				}
			}
		}
	}
`;
