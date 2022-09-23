import { Form, Input, message, Modal, Checkbox } from 'antd';
import { FC, ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { CreatePermission } from '@proovia-crm/crm-api-types';
import { showError } from '../../../utils/message.helper';
import { PermissionsApi } from '../../../api/permissions.api';
import ActionSelect from './ActionSelect';
import SubjectSelect from './SubjectSelect';

type Props = {
	edit?: boolean;
	onClose?: () => void;
} & ComponentPropsWithRef<typeof Modal>;

const NewPermissionModal: FC<Props> = ({ edit, onClose, ...modalProps }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = useForm();
	const handleOnOk = () => {
		form.submit();
	};

	const handleOnCancel = () => {
		onClose?.();
	};

	const handleOnFinish = async (values: CreatePermission) => {
		const permissionsApi = new PermissionsApi();
		setConfirmLoading(true);
		try {
			await permissionsApi.createPermission(values);
			onClose?.();
			message.success(`Permission ${values.name} successfully created.`);
		} catch (error) {
			showError(error);
		} finally {
			setConfirmLoading(false);
		}
	};

	return (
		<Modal
			title="New permission"
			okText="Create"
			{...modalProps}
			onOk={handleOnOk}
			onCancel={handleOnCancel}
			confirmLoading={confirmLoading}
			destroyOnClose
		>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 19 }}
				initialValues={{ remember: true }}
				onFinish={handleOnFinish}
				autoComplete="off"
				preserve={false}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: 'Please input permission name!' }]}
				>
					<Input />
				</Form.Item>

				<ActionSelect />
				<SubjectSelect />

				<Form.Item label="Description" name="description">
					<Input />
				</Form.Item>

				<Form.Item label="Fields" name="fields">
					<Input />
				</Form.Item>

				<Form.Item label="Conditions" name="conditions">
					<Input />
				</Form.Item>

				<Form.Item label="Reason" name="reason">
					<Input />
				</Form.Item>

				<Form.Item
					name="Inverted"
					valuePropName="inverted"
					wrapperCol={{ offset: 5, span: 19 }}
					initialValue={false}
				>
					<Checkbox>Inverted?</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default NewPermissionModal;
