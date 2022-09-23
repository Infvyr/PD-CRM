import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import axios from 'axios';
import { ComponentPropsWithRef, CSSProperties, FC } from 'react';
import { StyledContainer } from './ResultError.styles';

type Props = {
	error?: Error;
	style?: CSSProperties;
} & ComponentPropsWithRef<typeof Result>;

export const ResultError: FC<Props> = ({
	style,
	error,
	...rest
}): JSX.Element => {
	let status: ResultStatusType = '500';
	let title = 'Unexpected error!';
	let subTitle = 'Sorry, something went wrong!';

	if (axios.isAxiosError(error)) {
		status = (error.response?.status || status) as ResultStatusType;
		title = error.response?.statusText || title;
		if (status !== 500) {
			subTitle = error.response?.data.message || subTitle;
		}
	}
	return (
		<StyledContainer style={style}>
			<Result status={status} title={title} subTitle={subTitle} {...rest} />
		</StyledContainer>
	);
};
