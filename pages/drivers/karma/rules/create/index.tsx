import { Card, Col, Form, Input, InputNumber, message, Row } from 'antd';
import { useState } from 'react';
import { DriversKarmaRule } from '@proovia-crm/crm-api-types';
import { DriversKarmaApi } from '../../../../../api/drivers.karma.api';
import { Container, CustomPageHeader, Submit } from '../../../../../components';
import CustomHead from '../../../../../components/Head';
import { validateMessages } from '../../../../../config/Forms/validate-messages';
import { showError } from '../../../../../utils/message.helper';

const { TextArea } = Input;

function CreateDriverKarmaRules() {
	const driverKarmaApi = new DriversKarmaApi();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const formRuleWatch = Form.useWatch('rule', form);
	const formPenaltyPointsWatch = Form.useWatch('points', form);

	const formRequiredFields = [formRuleWatch, formPenaltyPointsWatch];
	const isFormComplete = (currentValue: unknown) => currentValue !== undefined;

	const showSuccessMessage = () =>
		message.success('Driver karma rule successfully created!');

	const onFinish = async (values: DriversKarmaRule) => {
		const newDriverKarmaRule = {
			rule: values.rule?.trim(),
			points: values.points
		};

		try {
			setLoading(true);
			await driverKarmaApi.createDriverKarmaRule(newDriverKarmaRule);
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
			<CustomHead title="Create Driver Karma Rule" />
			<CustomPageHeader
				title="Add Driver Karma Rule"
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
						onFinish={onFinish}
						validateMessages={validateMessages}
					>
						<Row gutter={[24, 24]} style={{ flexDirection: 'column' }}>
							<Col lg={6} xl={4}>
								<Form.Item
									name="rule"
									label="Rule"
									rules={[{ required: true }]}
									style={{ marginBottom: 0 }}
								>
									<TextArea
										placeholder="Karma rule"
										autoSize={{ minRows: 1, maxRows: 10 }}
									/>
								</Form.Item>
							</Col>
							<Col lg={6} xl={4}>
								<Form.Item
									name="points"
									label="Penalty Points"
									rules={[{ required: true }]}
									style={{ marginBottom: 0 }}
								>
									<InputNumber
										min={-100}
										max={100}
										precision={0}
										placeholder="Karma penalty points"
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</>
	);
}

export default CreateDriverKarmaRules;
