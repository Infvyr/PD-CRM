import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { ComponentPropsWithRef, FC, useCallback, useState } from 'react';
import { useMatchMutate } from '../../../../hooks/useMatchMutate';
import { showError } from '../../../../utils/message.helper';
import { ProfilesApi } from '../../../../api/profiles.api';

type Props = {
	profileId: number;
} & ComponentPropsWithRef<typeof Button>;

export const DeleteProfileButton: FC<Props> = ({
	profileId,
	...buttonProps
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const matchMutate = useMatchMutate();

	const handleOnDelete = useCallback(async () => {
		try {
			setLoading(true);
			const profilesApi = new ProfilesApi();
			await profilesApi.deleteProfile(profileId);
			matchMutate(/^\/api\/v1\/profiles/);
			router.back();
			message.success(`Profile successfully deleted.`);
		} catch (error) {
			showError(error);
		} finally {
			setLoading(false);
		}
	}, [matchMutate, profileId, router]);

	return (
		<Popconfirm
			title={'Are you sure?'}
			onConfirm={handleOnDelete}
			okText="Yes"
			cancelText="No"
		>
			<Button
				type="default"
				icon={<DeleteOutlined />}
				loading={loading}
				{...buttonProps}
			/>
		</Popconfirm>
	);
};
