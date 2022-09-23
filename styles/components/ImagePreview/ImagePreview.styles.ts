import { css } from 'styled-components';

export const ImagePreviewStyles = css`
	.ant-image-preview-operations {
		padding: 3px 10px;
		background-color: var(--brand-color-hover);
	}

	.ant-image-preview-operations-operation {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;

		transition: background-color 300ms ease;
		will-change: background-color;

		&:hover {
			background-color: rgb(255 255 255 / 10%);
		}
	}

	.ant-image-preview-img-wrapper {
		top: var(--header-height);
	}

	.ant-image-preview-operations-icon {
		@media (min-width: 1200px) {
			font-size: 20px;
		}
	}
`;
