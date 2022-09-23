import styled from 'styled-components';

type Props = {
	isStaticLayout?: boolean;
};

export const ContentWrapper = styled.div<Props>`
	padding-left: 16px;
	padding-right: 16px;

	position: relative;
	top: calc(
		var(--header-height) +
			${(props) =>
				props.isStaticLayout ? '24px' : 'var(--fixed-pagination-height) + 11px'}
	);
	min-height: ${(props) =>
		props.isStaticLayout
			? 'auto'
			: 'calc(100vh - var(--header-height) - var(--fixed-pagination-height) - 11px)'};
`;
