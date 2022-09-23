import { Checkbox, Form, Input, message, Modal } from 'antd';
import { FC, ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import RoleSelect from '../../roles/RoleSelect';
import ProfileSelect from '../../profiles/ProfileSelect';
import { UsersApi } from '../../../../api/users.api';
import { CreateUserValues } from './NewEditUserModal.types';
import axios from 'axios';

type Props = {
	edit?: boolean;
	onClose?: () => void;
} & ComponentPropsWithRef<typeof Modal>;

const NewEditUserModal: FC<Props> = ({ edit, onClose, ...modalProps }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = useForm();
	const handleOnOk = () => {
		form.submit();
	};

	const handleOnCancel = () => {
		onClose?.();
	};

	const handleOnFinish = async (values: CreateUserValues) => {
		const { firstName, lastName, role, ...rest } = values;
		const name = `${firstName} ${lastName}`;

		const userApi = new UsersApi();
		setConfirmLoading(true);
		try {
			await userApi.createUser({ ...rest, name, role: +role });
			onClose?.();
			message.success('User successfully created');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				message.error(error.response?.data?.message);
			} else {
				message.error('Something went wrong. Please try again');
			}
		} finally {
			setConfirmLoading(false);
		}
	};

	return (
		<Modal
			title="New user"
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
					label="First name"
					name="firstName"
					rules={[{ required: true, message: 'Please input first name!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Last name"
					name="lastName"
					rules={[{ required: true, message: 'Please input last name!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input password!' }]}
				>
					<Input />
				</Form.Item>

				<RoleSelect label="Role" />
				<ProfileSelect label="Profile" />

				<Form.Item
					name="mustChangePwd"
					valuePropName="checked"
					wrapperCol={{ offset: 5, span: 19 }}
					initialValue={true}
					style={{ marginBottom: 0 }}
				>
					<Checkbox>Require password change on login</Checkbox>
				</Form.Item>
				<Form.Item
					name="isActive"
					valuePropName="checked"
					wrapperCol={{ offset: 5, span: 19 }}
					initialValue={true}
				>
					<Checkbox>Is active?</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default NewEditUserModal;
