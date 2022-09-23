import { Form, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { flatMap } from 'lodash';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import { ProfilesApi } from '../../../api/profiles.api';
import {
	CustomButton,
	CustomPageHeader,
	ResultError,
	Spinner
} from '../../../components';
import CustomHead from '../../../components/Head/index';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import { usePermissions } from '../../../modules/admin/permissions/hooks/usePermissions';
import { getPermissionsIdsGroupedBySubject } from '../../../modules/admin/permissions/utils/groupBySubject';
import { DeleteProfileButton } from '../../../modules/admin/profiles/edit/DeleteProfileButton';
import { useProfile } from '../../../modules/admin/profiles/hooks/useProfile';
import PermissionsList from '../../../modules/admin/profiles/edit/PermissionsList/index';
import { showError } from '../../../utils/message.helper';

const Profile: FC = () => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const router = useRouter();
	const profileId = +(router.query.profile as string);

	const { data: profile, loading, error, mutate } = useProfile(profileId);
	const {
		data: permissions,
		loading: permissionsLoading,
		error: permissionsError
	} = usePermissions();
	const [form] = useForm();

	const handleOnFinish = useCallback(
		async (values: { [subject: string]: number[] }) => {
			const flattenValues = flatMap(values, (item) => item).filter(
				(item) => item
			);

			const profilesApi = new ProfilesApi();
			setConfirmLoading(true);
			try {
				await profilesApi.updateProfile(profileId, {
					permissions: flattenValues
				});
				await mutate();
				message.success(`Profile successfully updated.`);
			} catch (error) {
				showError(error);
			} finally {
				setConfirmLoading(false);
			}
		},
		[profileId, mutate]
	);

	const initialValues = useMemo(
		() => getPermissionsIdsGroupedBySubject(profile?.permissions),
		[profile?.permissions]
	);

	if (loading || permissionsLoading) return <Spinner />;
	if (error || permissionsError) return <ResultError />;

	return (
		<>
			<CustomHead title="Profile page" />
			<CustomPageHeader
				title={`Profile: ${profile?.name}`}
				url={'/admin/profiles'}
				extra={[
					<DeleteProfileButton profileId={profileId} key="deleteProfile">
						Delete
					</DeleteProfileButton>,
					<CustomButton
						btnText="Update"
						key="updateProfile"
						onClick={form.submit}
						loading={confirmLoading}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<Form form={form} onFinish={handleOnFinish} initialValues={initialValues}>
				<PermissionsList permissions={permissions?.data} />
			</Form>
		</>
	);
};

export default withAdminLayout(Profile);
