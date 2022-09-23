import { Layout } from 'antd';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { DashboardHeader } from '../index';

interface Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
}

export const DashboardLayout: FC<Props> = ({ children }): JSX.Element => (
	<>
		<DashboardHeader />
		<Layout>
			<Layout.Content>{children}</Layout.Content>
		</Layout>
	</>
);
