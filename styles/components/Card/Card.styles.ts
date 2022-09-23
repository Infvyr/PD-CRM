import { css } from 'styled-components';

export const CardStyles = css`
	.ant-card {
		height: 100%;

		&.primary {
			.ant-card-head {
				background-color: var(--brand-color);
				color: var(--white-color);
			}
			box-shadow: var(--box-shadow);
		}
	}
`;
