import { Card, Col, Divider, Row } from 'antd';
import { FC } from 'react';
import { Customer } from '../../../customers/components';
import {
	ImageLink,
	OrderDescription,
	OrderDimensions,
	OrderLink,
	OrderStatus
} from '../index';

export const GeneralInfo: FC = (): JSX.Element => {
	return (
		<Col xs={24} lg={12}>
			<Card bodyStyle={{ paddingTop: '15px' }}>
				<Row gutter={24}>
					<Col xs={24}>
						<Divider orientation="left">General Information</Divider>
					</Col>
					<Col xs={24} lg={12}>
						<Customer />
					</Col>
					<Col xs={24} lg={12}>
						<OrderStatus />
					</Col>
				</Row>

				<Row gutter={24}>
					<Col xs={24} lg={12}>
						<OrderDescription />
					</Col>
					<Col xs={24} lg={12}>
						<OrderDimensions />
					</Col>
				</Row>

				<Row gutter={24}>
					<Col xs={24}>
						<ImageLink />
					</Col>
				</Row>

				<Row gutter={24}>
					<Col xs={24}>
						<OrderLink />
					</Col>
				</Row>
			</Card>
		</Col>
	);
};
