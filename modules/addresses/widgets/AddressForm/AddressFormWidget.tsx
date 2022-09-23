import { Col, Divider, Form, Row } from 'antd';
import { FC } from 'react';
import { validateMessages } from '../../../../config/Forms/validate-messages';
import { Email, Mobile } from '../../../../components';
import { Customer } from '../../../customers/components';
import { AvailableHours, ContactName, AddressPostcode } from '../../components';
import { useSubmitAddressForm } from '../../hooks/useSubmitAddressForm';
import { Submit } from './Submit';

export const AddressFormWidget: FC = () => {
	const { onFinish, form, loading, formRequiredFields } =
		useSubmitAddressForm();

	return (
		<Form
			autoComplete="off"
			form={form}
			layout="vertical"
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<Row gutter={16}>
				<Col xs={24}>
					<Divider orientation="left">Contact Information</Divider>
				</Col>
				<Col xs={24} lg={12}>
					<ContactName />
				</Col>
				<Col xs={24} lg={12}>
					<Email />
				</Col>
				<Col xs={24} lg={12}>
					<Customer />
				</Col>
				<Col xs={24} lg={12}>
					<Mobile />
				</Col>
				<Col xs={24} lg={12}>
					<AvailableHours />
				</Col>
			</Row>

			<Row gutter={16}>
				<Col xs={24}>
					<Divider orientation="left">Address Information</Divider>
				</Col>
			</Row>

			<AddressPostcode inWidget />

			<Submit formRequiredFields={formRequiredFields} loading={loading} />
		</Form>
	);
};
