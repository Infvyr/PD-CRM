import { CreateClaimTodo } from '@proovia-crm/crm-api-types';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	message
} from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { ClaimsApi } from '../../../../api/claims.api';
import { Container, Submit } from '../../../../components';
import { namedComponent } from '../../../../config/dynamic-component';
import { DATE_PICKER_FORMAT } from '../../../../config/date-format';
import { useClaimTodo } from '../../hooks/useClaimTodo';
import ClaimTodoContext from './ClaimTodo.context';

const Dynamic = {
	CustomPageHeader: dynamic(() =>
		namedComponent(import('../../../../components'), 'CustomPageHeader')
	),
	ResultError: dynamic(() =>
		namedComponent(import('../../../../components'), 'ResultError')
	),
	Spinner: dynamic(() =>
		namedComponent(import('../../../../components'), 'Spinner')
	)
};

type Props = { edit?: boolean };

const { TextArea } = Input;

export const CreateEdit: FC<Props> = ({ edit = false }) => {
	const claimsApi = new ClaimsApi();

	const [loading, setLoading] = useState<boolean>(false);
	const [isTouchedFields, setTouchedFields] = useState<boolean>();
	const [form] = Form.useForm<CreateClaimTodo>();

	const { data: todo, error, mutate } = useClaimTodo();

	const onFinish = async (values: CreateClaimTodo) => {
		const formDueDate = values.dueDate.toString();

		const order = +values.order;
		const task = values.task.trim();
		const dueDate = moment(formDueDate).format();

		const claimTodo: CreateClaimTodo = {
			order,
			task,
			dueDate
		};

		try {
			setLoading(true);
			await form.validateFields();

			if (edit && todo?.id) {
				await claimsApi.updateClaimTodo(todo?.id, claimTodo);
				message.success('Claim todo updated successfully!');
			}
			if (!edit) {
				await claimsApi.createClaimTodo(claimTodo);
				message.success('Claim todo created successfully!');
				form.resetFields();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setTouchedFields(false);
			await mutate();
		}
	};

	const initialValues = useMemo(
		() =>
			edit
				? {
						task: todo?.task,
						dueDate: moment(moment(todo?.dueDate), DATE_PICKER_FORMAT)
				  }
				: {},
		[edit, todo]
	);

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Link href="/claims/todos/outstanding" passHref>
						<Button type="primary">Back to Outstanding ToDos</Button>
					</Link>
				}
			/>
		);
	if (edit && !todo) return <Dynamic.Spinner />;

	return (
		<ClaimTodoContext.Provider value={{ edit, form }}>
			<Dynamic.CustomPageHeader
				url="/claims/todos/outstanding"
				title={edit ? 'Edit ToDo' : 'Create ToDo'}
				extra={<Submit isLoading={loading} edit={edit} form={form} />}
				hasChanges={isTouchedFields}
			/>

			<Container>
				<Card
					bodyStyle={{
						height:
							'calc(100vh - var(--header-height) - var(--page-header-height) - 20px)'
					}}
				>
					<Form
						form={form}
						layout="vertical"
						autoComplete="off"
						name="create-claim-todo"
						onFinish={onFinish}
						onValuesChange={() => setTouchedFields(true)}
						initialValues={initialValues}
					>
						{!edit && (
							<Col xs={24} sm={4}>
								<Form.Item
									name="order"
									label="Order"
									rules={[
										{
											required: true,
											message: 'Please input order number!'
										}
									]}
								>
									<InputNumber
										min={1}
										placeholder="Order number"
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						)}
						<Col xs={24} sm={8}>
							<Form.Item
								name="task"
								label="Task"
								rules={[
									{ required: true, message: 'Please input task description!' }
								]}
							>
								<TextArea
									placeholder="Task description"
									autoSize={{ minRows: 2 }}
									maxLength={375}
									allowClear
									showCount
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={4}>
							<Form.Item
								name="dueDate"
								label="Due Date"
								rules={[{ required: true, message: 'Please select due date!' }]}
							>
								<DatePicker
									allowClear
									format={DATE_PICKER_FORMAT}
									placeholder="Select due date"
									style={{ width: '100%' }}
								/>
							</Form.Item>
						</Col>
					</Form>
				</Card>
			</Container>
		</ClaimTodoContext.Provider>
	);
};
