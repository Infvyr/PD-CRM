import { FC } from 'react';
import { Col, Row, Statistic, Typography } from 'antd';
import { Claim } from '@proovia-crm/crm-api-types';
import { capitalize, startCase } from 'lodash';

export const Info: FC<Claim> = ({
	order: claimOrder,
	paymentType,
	orderPaid,
	customerClaimAmount,
	status
}: Claim): JSX.Element => {
	const formatOrderPaid = (val: boolean) => {
		switch (val) {
			case true:
				return 'Paid';
			case false:
				return 'Unpaid';
			default:
				return '';
		}
	};

	return (
		<>
			<Typography.Title level={4}>Order {claimOrder}</Typography.Title>
			<Row gutter={[16, 20]}>
				<Col span={12}>
					<Statistic title="Payment Type" value={startCase(paymentType)} />
				</Col>
				<Col span={12}>
					<Statistic
						title="Payment Status"
						value={formatOrderPaid(orderPaid)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Customer Claim Amount"
						value={`£ ${customerClaimAmount}`}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Claim Status"
						value={capitalize(startCase(status))}
					/>
				</Col>
			</Row>
		</>
	);
};
