import { Form, Input, message, Modal } from 'antd';
import { FC, ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { CreateProfile } from '@proovia-crm/crm-api-types';
import { showError } from '../../../utils/message.helper';
import ProfileSelect from './ProfileSelect';
import { ProfilesApi } from '../../../api/profiles.api';
import { useRouter } from 'next/router';
import { rules } from '../../../config/Forms/rules';

type Props = {
	edit?: boolean;
	onClose?: () => void;
} & ComponentPropsWithRef<typeof Modal>;

const NewProfileModal: FC<Props> = ({ edit, onClose, ...modalProps }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = useForm();
	const handleOnOk = () => {
		form.submit();
	};
	const router = useRouter();

	const handleOnCancel = () => {
		onClose?.();
	};

	const handleOnFinish = async (values: CreateProfile) => {
		const profilesApi = new ProfilesApi();
		setConfirmLoading(true);
		try {
			const { data: profile } = await profilesApi.createProfile(values);
			router.push(`${router.asPath}/${profile.id}`);
			message.success(`Profile ${profile.name} successfully created.`);
		} catch (error) {
			showError(error);
		} finally {
			setConfirmLoading(false);
		}
	};

	return (
		<Modal
			title="New profile"
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
					label="Profile name"
					name="name"
					rules={rules['profileName']}
				>
					<Input />
				</Form.Item>

				<ProfileSelect label="Clone profile" name="cloneFrom" rules={[]} />

				<Form.Item label="Description" name="description">
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default NewProfileModal;
