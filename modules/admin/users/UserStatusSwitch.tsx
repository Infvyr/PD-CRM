import { User } from '@proovia-crm/crm-api-types';
import { Popconfirm, Switch, message, Tooltip } from 'antd';
import { FC, useCallback, useState } from 'react';
import { UsersApi } from '../../../api/users.api';
import { showError } from '../../../utils/message.helper';

type Props = {
	user: User;
};

export const UserStatusSwitch: FC<Props> = ({ user }) => {
	const [checked, setChecked] = useState(user.isActive);

	const handleOnChange = useCallback(async () => {
		const usersApi = new UsersApi();
		try {
			await usersApi.updateUser(+user.id, { isActive: !checked });
			setChecked(!checked);
			message.success('User status has been successfully updated!');
		} catch (error) {
			showError(error);
		}
	}, [user.id, checked]);

	return (
		<Tooltip title={checked ? 'Active' : 'Inactive'} placement="right">
			<Popconfirm title="Are you sure?" onConfirm={handleOnChange} okText="Yes">
				<Switch checked={checked} />
			</Popconfirm>
		</Tooltip>
	);
};
