import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'antd';
import { AccountMenu, AppMenu } from '../../components';
import logo from '../../public/assets/images/logo.svg';

import { StyledHeader, StyledLogo } from './DashboardHeader.styles';

export const DashboardHeader = (): JSX.Element => (
	<StyledHeader>
		<Row>
			<Col xs={5} sm={2} xl={1}>
				<Link href="/dashboard" passHref>
					<StyledLogo>
						<Image src={logo} width={90} height={52} alt="Proovia Logo" />
					</StyledLogo>
				</Link>
			</Col>
			<Col xs={17} sm={18} xl={19}>
				<AppMenu />
			</Col>
			<Col xs={2} sm={4} xl={4} style={{ textAlign: 'right' }}>
				<AccountMenu />
			</Col>
		</Row>
	</StyledHeader>
);
