import { Col, Form, Row } from 'antd';
import { FC } from 'react';
import {
	AddressInput,
	Email,
	Mobile,
	Name,
	Phone
} from '../../../../components';
import { validateMessages } from '../../../../config/Forms/validate-messages';
import { PaymentType } from '../../components';
import { useSubmitCustomerForm } from '../../hooks/useSubmitCustomerForm';
import { Submit } from './Submit';

export const CustomerFormWidget: FC = () => {
	const { onFinish, form, loading, formRequiredFields } =
		useSubmitCustomerForm();

	return (
		<Form
			autoComplete="off"
			form={form}
			layout="vertical"
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<Row gutter={24}>
				<Col xs={24} lg={12}>
					<Name placeholder="Customer name" />
				</Col>
				<Col xs={24} lg={12}>
					<Email placeholder="Customer email address" />
				</Col>
			</Row>

			<Row gutter={24}>
				<Col xs={24} lg={12}>
					<Phone placeholder="Customer phone number" />
				</Col>
				<Col xs={24} lg={12}>
					<Mobile placeholder="Customer mobile number" />
				</Col>
			</Row>

			<Row gutter={24}>
				<Col xs={24} lg={12}>
					<AddressInput placeholder="Customer address" />
				</Col>
				<Col xs={24} lg={12}>
					<PaymentType />
				</Col>
			</Row>

			<Submit formRequiredFields={formRequiredFields} loading={loading} />
		</Form>
	);
};
