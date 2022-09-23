import { Button, Card, Col, Divider, Form, Row } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { namedComponent } from '../../../config/dynamic-component';
import { validateMessages } from '../../../config/Forms/validate-messages';
import {
	CustomPageHeader,
	Submit,
	Container,
	Spinner
} from '../../../components';
import { hasRequiredFields } from '../../../utils/form.helpers';
import { useAddress } from '../hooks/useAddress';
import { useSubmitAddressForm } from '../hooks/useSubmitAddressForm';
import ContactInfo from './ContactInfo';
import { AddressPostcode } from './Postcode';
import { AddressPostcodeEdit } from './PostcodeEdit';

const Dynamic = {
	ResultError: dynamic(
		() => namedComponent(import('../../../components'), 'ResultError'),
		{
			ssr: false
		}
	)
};

type Props = { edit?: boolean };

/**
 * 1. In edit mode we have the customer key which requires a string value
 * according to CreateAddressDto.
 * Despite this point we cannot retrieve properly the customer value because of
 * api/v1/addresses/id which returns a zoho object (customer: {...})
 * 2. whichTown keys seems like is added incorrectly because
 * in CreateAddress interface it's missing and replaced with whichDays.
 * The latter key (whichDays) is correct.
 * */

export const AddressForm: FC<Props> = ({ edit = false }) => {
	const { data: address, error, loading: swrLoading } = useAddress();
	const { onFinish, form, loading, formRequiredFields } = useSubmitAddressForm(
		edit,
		address?.id as number
	);

	const initialValues = useMemo(
		() =>
			edit
				? {
						contactName: address?.contactName,
						email: address?.email,
						houseName: address?.houseName,
						line1: address?.line1,
						line2: address?.line2,
						line3: address?.line3,
						line4: address?.line4,
						line5: address?.line5,
						postcode: address?.postcode,
						customer: address?.customer,
						latitude: address?.latitude,
						longitude: address?.longitude,
						mobile: address?.mobile,
						postTown: address?.postTown,
						whichTown: address?.whichDays,
						workingHours: address?.workingHours
				  }
				: undefined,
		[edit, address]
	);

	if (edit && swrLoading) return <Spinner style={{ height: '100vh' }} />;

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Link href="/customers/addresses" passHref>
						<Button type="primary">Back to addresses</Button>
					</Link>
				}
			/>
		);

	return (
		<>
			<CustomPageHeader
				title={edit ? 'Edit address' : 'Create address'}
				url="/customers/addresses"
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
						<Row gutter={[24, 24]}>
							<ContactInfo />

							<Col xs={24} lg={12} xl={16}>
								<Divider orientation="left">Address Information</Divider>
								{edit ? (
									<AddressPostcodeEdit />
								) : (
									<AddressPostcode onCreateAddress />
								)}
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</>
	);
};
