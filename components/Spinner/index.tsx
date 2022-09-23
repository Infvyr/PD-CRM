import { Spin } from 'antd';
import { CSSProperties, FC } from 'react';
import { StyledContainer } from './Spinner.styles';

type Props = {
	style?: CSSProperties;
};

export const Spinner: FC<Props> = ({ style }): JSX.Element => {
	return (
		<StyledContainer style={style}>
			<Spin size="large" />
		</StyledContainer>
	);
};
