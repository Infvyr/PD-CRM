import { UpdateUser } from '@proovia-crm/crm-api-types';
import { Button, Col, Form, message, Row, Space } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import { UsersApi } from '../../../api/users.api';
import { ResultError, Spinner, CustomPageHeader } from '../../../components';
import CustomHead from '../../../components/Head/index';
import { useMatchMutate } from '../../../hooks/useMatchMutate';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import {
	ActionsDropdown,
	ActivityInfo,
	AuthenticationInfo,
	SecurityInfo,
	UserInfo,
	UserProfile
} from '../../../modules/admin/users/edit';
import { useUser } from '../../../modules/admin/users/hooks/useUser';
import { showError } from '../../../utils/message.helper';

const EditUser: FC = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const matchMutate = useMatchMutate();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const userId = router.query.userId as string;

	const { data: user, loading, error } = useUser(userId);

	const handleOnFinish = useCallback(
		async (values: UpdateUser) => {
			try {
				setConfirmLoading(true);
				const usersApi = new UsersApi();
				await usersApi.updateUser(userId, values);
				matchMutate(/^\/api\/v1\/users/);
				message.success(`Profile successfully updated.`);
			} catch (error) {
				showError(error);
			} finally {
				setConfirmLoading(false);
				// form.setFieldsValue({ password: '********' });
			}
		},
		[userId, matchMutate]
	);

	const initialValues: UpdateUser = useMemo(
		() => ({
			...user,
			profile: user?.profile?.id,
			role: user?.role?.id,
			birthDate: user?.birthDate ? moment(user?.birthDate) : undefined,
			password: undefined
		}),
		[user]
	);

	if (loading) return <Spinner />;
	if (error) return <ResultError />;

	return (
		<>
			<CustomHead title={`Edit user`} />
			<CustomPageHeader
				title={'User profile'}
				url="/admin/users"
				extra={[
					<ActionsDropdown key="actions" user={user} />,
					<Space key="edit">
						<Button
							type="primary"
							onClick={() => form.submit()}
							loading={confirmLoading}
						>
							Update user
						</Button>
					</Space>
				]}
				style={{ left: '302px' }}
			/>
			<Form<UpdateUser>
				initialValues={initialValues}
				onFinish={handleOnFinish}
				form={form}
				autoComplete="off"
			>
				<UserProfile user={user} />
				<Row gutter={[8, 8]}>
					<Col span={12} className="gutter-row">
						<Space direction="vertical" style={{ width: '100%' }}>
							<UserInfo />
							<AuthenticationInfo />
						</Space>
					</Col>
					<Col span={12} className="gutter-row">
						<Space direction="vertical" style={{ width: '100%' }}>
							<SecurityInfo user={user} />
							<ActivityInfo user={user} />
						</Space>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default withAdminLayout(EditUser);
