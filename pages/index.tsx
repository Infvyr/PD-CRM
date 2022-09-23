import { Col, Divider, Row } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import { LoginForm } from '../components/';
import backgroundImage from '../public/assets/images/bg-splash.jpeg';
import logo from '../public/assets/images/logo.svg';
import { StyledAlignment, StyledBackground } from '../styles';

const StyledCol = styled(Col)`
	margin-top: -2rem;

	@media (min-width: 1920px) {
		max-width: 400px;
		flex-basis: 400px;
	}
`;

function PageIndex() {
	return (
		<StyledBackground url={backgroundImage.src} height="100vh">
			<Row align="middle" justify="center" style={{ height: '100%' }}>
				<StyledCol sm={12} md={11} lg={7} xl={6}>
					<StyledAlignment align="center">
						<Image src={logo} width={251} height={94} alt="Proovia Logo" />
					</StyledAlignment>
					<Divider>CRM</Divider>
					<LoginForm />
				</StyledCol>
			</Row>
		</StyledBackground>
	);
}

export default PageIndex;

export function getServerSideProps() {
	return {
		props: {
			public: true
		}
	};
}
