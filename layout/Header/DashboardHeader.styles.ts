import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledLogo = styled.a`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: flex-start;
`;

export const StyledHeader = styled(Layout.Header)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
`;
