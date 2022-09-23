import styled from 'styled-components';
import { Col, Typography } from 'antd';

type Props = {
	note: string;
};
export const StyledImageContainer = styled(Col)<Props>`
	display: grid;
	grid-template-columns: 100px 1fr;
	gap: ${(props) => (props.note ? '15px' : null)};
`;

export const StyledParagraph = styled(Typography.Paragraph)`
	font-size: 14px;
`;
