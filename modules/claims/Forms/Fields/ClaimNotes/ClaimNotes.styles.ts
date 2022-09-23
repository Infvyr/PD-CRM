import styled from 'styled-components';

export const TableWrapper = styled.div`
	.delete-claim-note {
		visibility: hidden;
		opacity: 0;
		font-size: 0;
		color: var(--brand-color);
		transition: visibility 300ms ease-in-out, opacity 300ms ease-in-out,
			font-size 300ms ease-in-out;
	}

	.ant-table-cell-row-hover > .delete-claim-note {
		visibility: visible;
		opacity: 1;
		font-size: initial;
	}

	.ant-table-cell-row-hover > .note-index {
		display: none;
	}

	.ant-table-placeholder {
		display: none;
	}
`;
