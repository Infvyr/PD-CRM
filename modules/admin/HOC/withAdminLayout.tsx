import { FC } from 'react';
import { Container } from '../../../components';
import { StyledContent } from '../Layout';
import SideMenu from '../SideMenu';

export const withAdminLayout = <T extends Record<string, unknown>>(
	Component: FC<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element | null {
		return (
			<Container style={{ paddingLeft: 0, paddingRight: 0 }}>
				<SideMenu />
				<StyledContent>
					<Component {...props} />
				</StyledContent>
			</Container>
		);
	};
};
