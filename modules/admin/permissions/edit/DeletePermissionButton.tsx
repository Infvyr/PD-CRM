import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { ComponentPropsWithRef, FC, useCallback, useState } from 'react';
import { PermissionsApi } from '../../../../api/permissions.api';
import { useMatchMutate } from '../../../../hooks/useMatchMutate';
import { showError } from '../../../../utils/message.helper';

type Props = {
	permissionId: number;
} & ComponentPropsWithRef<typeof Button>;

export const DeletePermissionButton: FC<Props> = ({
	permissionId,
	...buttonProps
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const matchMutate = useMatchMutate();

	const handleOnDelete = useCallback(async () => {
		try {
			setLoading(true);
			const permissionsApi = new PermissionsApi();
			await permissionsApi.deletePermission(permissionId);
			matchMutate(/^\/api\/v1\/roles/);
			router.back();
			message.success(`Role successfully deleted.`);
		} catch (error) {
			showError(error);
		} finally {
			setLoading(false);
		}
	}, [matchMutate, permissionId, router]);

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
