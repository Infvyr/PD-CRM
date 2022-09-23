import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
`;

export const StyledUser = styled.span`
	color: var(--white-color);

	@media screen and (max-width: 576px) {
		display: none !important;
	}
`;
