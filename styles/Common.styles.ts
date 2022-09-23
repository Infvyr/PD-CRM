import styled from 'styled-components';
import { Layout } from 'antd';

type StyledAlignmentProps = {
	align?: 'left' | 'right' | 'center' | 'justify';
	display?: 'block' | 'flex' | 'inline-block' | 'inline-flex';
	justifyContent?:
		| 'center'
		| 'flex-start'
		| 'flex-end'
		| 'space-around'
		| 'space-between';
	alignContent?: 'center' | 'flex-start' | 'flex-end';
	flexDirection?: 'column' | 'row';
	gap?: string;
	width?: string;
	height?: string;
};

type StyledBackgroundProps = {
	url?: string;
	height?: string;
};

export const StyledAlignment = styled.div<StyledAlignmentProps>`
	text-align: ${(props) => props.align};
	display: ${(props) => props.display};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignContent};
	flex-direction: ${(props) => props.flexDirection};
	gap: ${(props) => props.gap};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;

export const StyledBackground = styled(Layout.Content)<StyledBackgroundProps>`
	height: ${(props) => props.height};
	background-image: url(${(props) => props.url});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;
