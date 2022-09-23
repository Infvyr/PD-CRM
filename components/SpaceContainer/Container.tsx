import { CSSProperties, FC } from 'react';
import { ContentWrapper } from './Container.styles';

type Props = {
	isStaticLayout?: boolean;
	style?: CSSProperties;
};

export const Container: FC<Props> = ({
	isStaticLayout,
	children,
	style
}): JSX.Element => (
	<ContentWrapper isStaticLayout={isStaticLayout} style={style}>
		{children}
	</ContentWrapper>
);
