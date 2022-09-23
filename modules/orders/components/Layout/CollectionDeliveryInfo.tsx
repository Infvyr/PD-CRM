import { Card, Col, Divider, Row } from 'antd';
import { FC } from 'react';
import { AddressPostcode } from '../../../addresses/components';
import { OrderCollectionDate, OrderDeliveryDate, OrderTotalPrice } from '../';

export const CollectionDeliveryInfo: FC = (): JSX.Element => {
	return (
		<Col xs={24} lg={12}>
			<Card bodyStyle={{ paddingTop: '15px' }}>
				<Row gutter={24}>
					<Col xs={24}>
						<Divider orientation="left">
							Collection & Delivery Information
						</Divider>
					</Col>

					<Col xs={24} lg={12}>
						<AddressPostcode
							name="collectionAddress"
							label="Collection Address"
						/>
					</Col>
					<Col xs={24} lg={12}>
						<OrderCollectionDate />
					</Col>
				</Row>

				<Row gutter={24}>
					<Col xs={24} lg={12}>
						<AddressPostcode name="deliveryAddress" label="Delivery Address" />
					</Col>
					<Col xs={24} lg={12}>
						<OrderDeliveryDate />
					</Col>
				</Row>

				<Row gutter={24}>
					<Col xs={24}>
						<OrderTotalPrice />
					</Col>
				</Row>
			</Card>
		</Col>
	);
};
