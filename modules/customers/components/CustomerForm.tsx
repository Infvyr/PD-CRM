import { Button, Card, Col, Form, Row } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { namedComponent } from '../../../config/dynamic-component';
import { validateMessages } from '../../../config/Forms/validate-messages';
import {
	CustomPageHeader,
	Email,
	Phone,
	Name,
	Mobile,
	Submit,
	Container,
	AddressInput,
	Spinner
} from '../../../components';
import { hasRequiredFields } from '../../../utils/form.helpers';
import { useCustomer } from '../hooks/useCustomer';
import { useSubmitCustomerForm } from '../hooks/useSubmitCustomerForm';
import { PaymentType } from './index';

const Dynamic = {
	ResultError: dynamic(
		() => namedComponent(import('../../../components'), 'ResultError'),
		{
			ssr: false
		}
	)
};

type Props = { edit?: boolean };

export const CustomerForm: FC<Props> = ({ edit = false }) => {
	const { data: customer, error, loading: swrLoading } = useCustomer();
	const { onFinish, form, loading, formRequiredFields } = useSubmitCustomerForm(
		edit,
		customer?.id as number
	);

	const initialValues = useMemo(
		() =>
			edit
				? {
						id: customer?.id,
						name: customer?.name,
						email: customer?.email,
						phone: customer?.phone,
						mobile: customer?.mobile,
						address: customer?.address,
						paymentType: customer?.paymentType
				  }
				: undefined,
		[edit, customer]
	);

	if (edit && swrLoading) return <Spinner style={{ height: '100vh' }} />;

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Link href="/customers" passHref>
						<Button type="primary">Back to customers</Button>
					</Link>
				}
			/>
		);

	return (
		<>
			<CustomPageHeader
				title={edit ? 'Edit customer' : 'Create customer'}
				url="/customers"
				extra={
					<Submit
						disabled={hasRequiredFields(formRequiredFields)}
						isLoading={loading}
						edit={edit}
						form={form}
					/>
				}
			/>

			<Container>
				<Card
					style={{ minHeight: 'inherit' }}
					bodyStyle={{ minHeight: 'inherit' }}
				>
					<Form
						autoComplete="off"
						form={form}
						layout="vertical"
						onFinish={onFinish}
						validateMessages={validateMessages}
						initialValues={initialValues}
					>
						<Row gutter={24}>
							<Col xs={24} lg={5} xl={4}>
								<Name placeholder="Customer name" />
							</Col>
							<Col xs={24} lg={5} xl={4}>
								<Email placeholder="Customer email address" />
							</Col>
						</Row>

						<Row gutter={24}>
							<Col xs={24} lg={5} xl={4}>
								<Phone placeholder="Customer phone number" />
							</Col>
							<Col xs={24} lg={5} xl={4}>
								<Mobile placeholder="Customer mobile number" />
							</Col>
						</Row>

						<Row gutter={24}>
							<Col xs={24} lg={5} xl={4}>
								<AddressInput placeholder="Customer address" />
							</Col>
							<Col xs={24} lg={5} xl={4}>
								<PaymentType />
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</>
	);
};
