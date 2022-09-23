import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { ComponentPropsWithRef, FC, useCallback, useState } from 'react';
import { RolesApi } from '../../../api/roles.api';
import { useMatchMutate } from '../../../hooks/useMatchMutate';
import { showError } from '../../../utils/message.helper';

type Props = {
	roleId: number;
} & ComponentPropsWithRef<typeof Button>;

export const DeleteRoleButton: FC<Props> = ({ roleId, ...buttonProps }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const matchMutate = useMatchMutate();

	const handleOnDelete = useCallback(async () => {
		try {
			setLoading(true);
			const rolesApi = new RolesApi();
			await rolesApi.deleteRole(roleId);
			matchMutate(/^\/api\/v1\/roles/);
			router.back();
			message.success(`Role successfully deleted.`);
		} catch (error) {
			showError(error);
		} finally {
			setLoading(false);
		}
	}, [matchMutate, roleId, router]);

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
