import { Form, Input, message, Modal } from 'antd';
import { FC, ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import RoleSelect from './RoleSelect';
import { CreateRole } from '@proovia-crm/crm-api-types';
import { RolesApi } from '../../../api/roles.api';
import { showError } from '../../../utils/message.helper';
import { rules } from '../../../config/Forms/rules';
import { useMatchMutate } from '../../../hooks/useMatchMutate';

type Props = {
	edit?: boolean;
	onClose?: () => void;
} & ComponentPropsWithRef<typeof Modal>;

const NewRoleModal: FC<Props> = ({ edit, onClose, ...modalProps }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const matchMutate = useMatchMutate();
	const [form] = useForm();
	const handleOnOk = () => {
		form.submit();
	};

	const handleOnCancel = () => {
		onClose?.();
	};

	const handleOnFinish = async (values: CreateRole) => {
		const rolesApi = new RolesApi();
		setConfirmLoading(true);
		try {
			await rolesApi.createRole(values);
			onClose?.();
			message.success(`Role ${values.name} has been successfully created.`);
			matchMutate(/^\/api\/v1\/roles/);
		} catch (error) {
			showError(error);
		} finally {
			setConfirmLoading(false);
		}
	};

	return (
		<Modal
			title="New role"
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
				<Form.Item label="Role name" name="name" rules={rules['roleName']}>
					<Input />
				</Form.Item>

				<RoleSelect
					label="Reports to"
					name="parentRole"
					rules={[{ required: true, message: 'Please select parent role!' }]}
				/>
				<Form.Item label="Description" name="description">
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default NewRoleModal;
