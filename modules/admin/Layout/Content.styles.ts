import styled from 'styled-components';

export const StyledContent = styled.div`
	margin-left: 302px;
	padding: 1rem;
	min-height: calc(
		100vh - var(--header-height) - var(--fixed-pagination-height) - 11px
	);
	background-color: var(--white-color);

	@media (max-width: 992px) {
		margin-left: 0;
		margin-bottom: 1rem;
	}
`;
