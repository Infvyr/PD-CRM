import { Empty } from 'antd';
import { CSSProperties, FC, ReactNode } from 'react';
import { StyledAlignment } from '../../styles';

type Props = {
	description?: string | ReactNode;
	style?: CSSProperties;
};

export const EmptyData: FC<Props> = ({ description, style }): JSX.Element => {
	return (
		<StyledAlignment
			display="flex"
			alignContent="center"
			justifyContent="center"
			style={style}
		>
			<Empty description={description} />
		</StyledAlignment>
	);
};
