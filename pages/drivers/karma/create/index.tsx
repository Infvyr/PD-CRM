import { DriverKarma } from '@proovia-crm/crm-api-types';
import { Card, Col, Form, message, Row } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { DriversKarmaApi } from '../../../../api/drivers.karma.api';
import { Container, CustomPageHeader, Submit } from '../../../../components';
import CustomHead from '../../../../components/Head';
import { validateMessages } from '../../../../config/Forms/validate-messages';
import {
	DriverKarmaComment,
	DriverKarmaDatePicker,
	DriverKarmaRuleSelect
} from '../../../../modules/driverKarma/components';
import { DriverSelect } from '../../../../modules/drivers/components';
import { showError } from '../../../../utils/message.helper';

function CreateDriverKarma() {
	const driverKarmaApi = new DriversKarmaApi();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const formKarmaRuleIdWatch = Form.useWatch('karmaRuleId', form);
	const formDriverIdWatch = Form.useWatch('driverId', form);
	const formCommittedOnWatch = Form.useWatch('committedOn', form);

	const formRequiredFields = [
		formKarmaRuleIdWatch,
		formDriverIdWatch,
		formCommittedOnWatch
	];
	const isFormComplete = (currentValue: unknown) => currentValue !== undefined;

	const showSuccessMessage = () =>
		message.success('Driver karma successfully created!');

	const onFinish = async (values: DriverKarma) => {
		const formCommittedOn = values.committedOn.toString();
		const formDriverId = values.driverId! && +values.driverId;
		const newDriverKarma = {
			comments: values.comments?.trim(),
			committedOn: moment(formCommittedOn).format(),
			karmaRuleId: +values.karmaRuleId
		};

		try {
			setLoading(true);
			await driverKarmaApi.createDriverKarma(formDriverId, newDriverKarma);
			showSuccessMessage();
			form.resetFields();
		} catch (error) {
			showError(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<CustomHead title="Create Driver Karma" />
			<CustomPageHeader
				title="Add Driver Karma"
				backIcon={false}
				extra={
					<Submit
						form={form}
						disabled={!formRequiredFields.every(isFormComplete)}
						isLoading={loading}
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
						name="karma-create-form"
						onFinish={onFinish}
						validateMessages={validateMessages}
					>
						<Row gutter={[24, 24]} style={{ flexDirection: 'column' }}>
							<Col lg={6} xl={4}>
								<DriverSelect />
							</Col>
							<Col lg={6} xl={4}>
								<DriverKarmaRuleSelect />
							</Col>
							<Col lg={6} xl={4}>
								<DriverKarmaDatePicker />
							</Col>
							<Col lg={6} xl={4}>
								<DriverKarmaComment />
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</>
	);
}

export default CreateDriverKarma;
