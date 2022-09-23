import { CheckOutlined } from '@ant-design/icons';
import { UpdateRole } from '@proovia-crm/crm-api-types';
import { Form, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { RolesApi } from '../../../api/roles.api';
import {
	CustomButton,
	CustomPageHeader,
	ResultError,
	Spinner
} from '../../../components';
import CustomHead from '../../../components/Head';
import { useMatchMutate } from '../../../hooks/useMatchMutate';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import { useRole } from '../../../modules/admin/roles/hooks/useRole';
import { RoleInfo } from '../../../modules/admin/roles/role-details/RoleInfo';
import { showError } from '../../../utils/message.helper';
import { DeleteRoleButton } from '../../../modules/admin/roles/DeleteRoleButton';

const RoleDetails: FC = () => {
	const router = useRouter();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const roleId = +(router.query.role as string);
	const { data: role, loading, error } = useRole(roleId);
	const [form] = useForm();
	const matchMutate = useMatchMutate();

	const handleOnFinish = useCallback(
		async (values: UpdateRole) => {
			try {
				setConfirmLoading(true);
				const rolesApi = new RolesApi();
				await rolesApi.updateRole(roleId, values);
				matchMutate(/^\/api\/v1\/roles/);
				message.success(`Role successfully updated.`);
			} catch (error) {
				showError(error);
			} finally {
				setConfirmLoading(false);
			}
		},
		[matchMutate, roleId]
	);

	if (loading) return <Spinner />;
	if (error) return <ResultError />;

	return (
		<>
			<CustomHead title="Role details" />
			<CustomPageHeader
				title="Role details"
				extra={[
					<DeleteRoleButton roleId={roleId} key="deleteRole">
						Delete
					</DeleteRoleButton>,
					<CustomButton
						loading={confirmLoading}
						btnText="Update"
						key="updateRole"
						icon={<CheckOutlined />}
						onClick={form.submit}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<Form form={form} onFinish={handleOnFinish} initialValues={role}>
				<RoleInfo role={role} />
			</Form>
		</>
	);
};

export default withAdminLayout(RoleDetails);
