import { CheckOutlined } from '@ant-design/icons';
import { UpdateRole } from '@proovia-crm/crm-api-types';
import { Form, Input, message, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import {
	Container,
	CustomButton,
	CustomPageHeader,
	ResultError,
	Spinner
} from '../../../components';
import CustomHead from '../../../components/Head';
import { useMatchMutate } from '../../../hooks/useMatchMutate';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import { showError } from '../../../utils/message.helper';
import { usePermission } from '../../../modules/admin/permissions/hooks/usePermission';
import { PermissionsApi } from '../../../api/permissions.api';
import { DeletePermissionButton } from '../../../modules/admin/permissions/edit/DeletePermissionButton';
import ActionSelect from '../../../modules/admin/permissions/ActionSelect/index';
import SubjectSelect from '../../../modules/admin/permissions/SubjectSelect/index';

const PermissionDetails: FC = () => {
	const router = useRouter();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const permissionId = +(router.query.permission as string);
	const { data: role, loading, error } = usePermission(permissionId);
	const [form] = useForm();
	const matchMutate = useMatchMutate();

	const handleOnFinish = useCallback(
		async (values: UpdateRole) => {
			try {
				setConfirmLoading(true);
				const permissionsApi = new PermissionsApi();
				await permissionsApi.updatePermission(permissionId, values);
				matchMutate(/^\/api\/v1\/roles/);
				message.success(`Permission successfully updated.`);
			} catch (error) {
				showError(error);
			} finally {
				setConfirmLoading(false);
			}
		},
		[matchMutate, permissionId]
	);

	if (loading) return <Spinner />;
	if (error) return <ResultError />;

	return (
		<>
			<CustomHead title="Permission details" />
			<CustomPageHeader
				title="Permission details"
				extra={[
					<DeletePermissionButton
						permissionId={permissionId}
						key="deletePermission"
					>
						Delete
					</DeletePermissionButton>,
					<CustomButton
						loading={confirmLoading}
						btnText="Update"
						key="updatePermission"
						icon={<CheckOutlined />}
						onClick={form.submit}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<Container>
				<Form
					form={form}
					onFinish={handleOnFinish}
					initialValues={role}
					layout="vertical"
					style={{ maxWidth: '450px' }}
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{ required: true, message: 'Please input permission name!' }
						]}
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
						name="inverted"
						valuePropName="inverted"
						initialValue={false}
					>
						<Checkbox>Inverted?</Checkbox>
					</Form.Item>
				</Form>
			</Container>
		</>
	);
};

export default withAdminLayout(PermissionDetails);
