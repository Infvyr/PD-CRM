import { Col, Divider, Row } from 'antd';
import { FC, memo } from 'react';
import { AvailableHours, ContactName } from '..';
import { Email, Mobile } from '../../../../components';
import { Customer } from '../../../customers/components';

const ContactInfo: FC = (): JSX.Element => (
	<Col xs={24} lg={12} xl={8}>
		<Row>
			<Col xs={24}>
				<Divider orientation="left">Contact Information</Divider>
			</Col>
		</Row>

		<Row gutter={24}>
			<Col xs={24} lg={12}>
				<ContactName />
			</Col>
			<Col xs={24} lg={12}>
				<Email />
			</Col>
		</Row>

		<Row gutter={24}>
			<Col xs={24} lg={12}>
				<Customer />
			</Col>
			<Col xs={24} lg={12}>
				<Mobile />
			</Col>
		</Row>

		<Row gutter={24}>
			<Col xs={24} lg={12}>
				<AvailableHours />
			</Col>
		</Row>
	</Col>
);

export default memo(ContactInfo);
