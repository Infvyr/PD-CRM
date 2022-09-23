import {
	ClaimStatus,
	CreateClaim,
	PaymentType
} from '@proovia-crm/crm-api-types';
import { Button, Card, Col, Form, message, Row } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import { ClaimsApi } from '../../../../api/claims.api';
import {
	Container,
	CustomPageHeader,
	Spinner,
	Submit
} from '../../../../components';
import { namedComponent } from '../../../../config/dynamic-component';
import { StyledAlignment } from '../../../../styles';
import { showError } from '../../../../utils/message.helper';
import { ClaimImageAdapter } from '../../adapters/claimImageAdapter';
import { ClaimImageFileAdapter } from '../../adapters/claimImageFileAdapter';
import { useClaim } from '../../hooks/useClaim';
import { ClaimMedia } from '../Fields/ClaimMedia';
import CreateEditClaimContext from './CreateEditClaim.context';
import { CreatedEditClaimInitialValues } from './CreateEditClaim.types';
import { nanoid } from 'nanoid';

const Dynamic = {
	ArrivalNotes: dynamic(() =>
		namedComponent(import('../Fields/ArrivalNotes'), 'ArrivalNotes')
	),
	Fields: dynamic(() => namedComponent(import('../Fields/Fields'), 'Fields')),
	ClaimNotes: dynamic(() =>
		namedComponent(import('../Fields/ClaimNotes'), 'ClaimNotes')
	),
	ClaimMedia: dynamic(() =>
		namedComponent(import('../Fields/ClaimMedia'), 'ClaimMedia')
	),
	ResultError: dynamic(() =>
		namedComponent(import('../../../../components'), 'ResultError')
	)
};

const defaultInitialValues: Partial<CreatedEditClaimInitialValues> = {
	status: ClaimStatus.NEW,
	paymentType: PaymentType.UNKNOWN,
	customerClaimAmount: 0
};

interface Props {
	edit?: boolean;
}

export const CreateEditClaimForm: FC<Props> = ({ edit = false }) => {
	const claimsApi = new ClaimsApi();
	const [loading, setLoading] = useState<boolean>(false);
	const [isTouchedFields, setTouchedFields] = useState<boolean>();
	const [form] = Form.useForm<CreatedEditClaimInitialValues>();
	const router = useRouter();
	const { data: claim, mutate, loading: swrLoading, error } = useClaim();

	const onFinish = async (values: CreatedEditClaimInitialValues) => {
		const orderId = +values.orderId;
		const status = edit ? values.status : ClaimStatus.NEW;
		const collectionDriverId = values.collectionDriverId
			? +values.collectionDriverId
			: null;
		const deliveryDriverId = values.deliveryDriverId
			? +values.deliveryDriverId
			: null;
		const customerClaimAmount = +values.customerClaimAmount;
		const paymentType = values.paymentType;
		const notes = values.claimNotes;
		const images = values.claimImages.map((image) => ({
			...new ClaimImageFileAdapter(image)
		}));
		const settledAmount = +(values.settledAmount || 0);

		const newClaim: CreateClaim = {
			orderId,
			status,
			collectionDriverId,
			deliveryDriverId,
			customerClaimAmount,
			orderPaid: true,
			paymentType,
			notes,
			images,
			settledAmount,
			isWarehouseGuilty: values.isWarehouseGuilty,
			guiltyDriverId: values.guiltyDriverId ? +values.guiltyDriverId : null
		};

		try {
			setLoading(true);
			if (edit && claim?.id) {
				await claimsApi.updateClaim(claim?.id, newClaim);
				message.success('Claim updated successfully!');
			}
			if (!edit) {
				const response = await claimsApi.createNewClaim(newClaim);

				if (response.status === 201) {
					message.success('Claim created successfully!', 1.8);
					form.resetFields();
					await router.push(`/claims/edit/${response.data.id}`);
				}
			}
		} catch (error) {
			console.error(error);
			showError(error);
		} finally {
			setLoading(false);
			setTouchedFields(false);
			await mutate();
		}
	};

	const initialValues: Partial<CreatedEditClaimInitialValues> = useMemo(
		() =>
			edit
				? {
						id: claim?.id,
						orderId: +(claim?.order || 0),
						collectionDriverId: claim?.collectionDriver?.id,
						deliveryDriverId: claim?.deliveryDriver?.id,
						status: claim?.status,
						customerClaimAmount: claim?.customerClaimAmount,
						paymentType: claim?.paymentType,
						claimImages: claim?.images.map((image) => ({
							...new ClaimImageAdapter(image)
						})),
						claimNotes: claim?.notes.map((note) => ({
							...note,
							key: nanoid()
						})),
						settledAmount: claim?.settledAmount,
						guiltyDriverId: claim?.guiltyDriver?.id,
						isWarehouseGuilty: claim?.isWarehouseGuilty
				  }
				: defaultInitialValues,
		[edit, claim]
	);

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Link href="/claims/damage-claim-report" passHref>
						<Button type="primary">Back to claims</Button>
					</Link>
				}
			/>
		);

	if (edit && swrLoading)
		return (
			<StyledAlignment style={{ height: '100vh' }}>
				<Spinner />
			</StyledAlignment>
		);

	return (
		<CreateEditClaimContext.Provider value={{ edit, form }}>
			<Container>
				<CustomPageHeader
					url="/claims/damage-claim-report"
					title={edit ? 'Edit claim' : 'Damage claim'}
					extra={
						<Submit
							isLoading={loading}
							edit={edit}
							form={form}
							disabled={!isTouchedFields}
						/>
					}
					hasChanges={isTouchedFields}
				/>
				<Form
					id="create-edit-claim"
					name="create-edit-claim"
					autoComplete="off"
					form={form}
					onFinish={onFinish}
					onValuesChange={() => setTouchedFields(true)}
					initialValues={initialValues}
				>
					<Row gutter={[16, 16]}>
						<Col xs={24} xl={12}>
							<Row gutter={[16, 16]}>
								<Col xs={24}>
									<Card>
										<Dynamic.Fields />
									</Card>
								</Col>

								<Col xs={24}>
									<Card>
										<Dynamic.ClaimNotes />
									</Card>
								</Col>
								<Col xs={24}>
									<Card>
										<ClaimMedia />
									</Card>
								</Col>
							</Row>
						</Col>

						<Col xs={24} xl={12}>
							<Card bodyStyle={{ height: '100%' }}>
								<Dynamic.ArrivalNotes />
							</Card>
						</Col>
					</Row>
					<br />
				</Form>
			</Container>
		</CreateEditClaimContext.Provider>
	);
};
