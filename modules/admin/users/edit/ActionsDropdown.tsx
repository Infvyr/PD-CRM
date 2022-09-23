import { DeleteFilled, DownOutlined, StopOutlined } from '@ant-design/icons';
import { User } from '@proovia-crm/crm-api-types';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import { FC } from 'react';
import { UsersApi } from '../../../../api/users.api';
import { showError } from '../../../../utils/message.helper';
import { useMatchMutate } from '../../../../hooks/useMatchMutate';

type Props = {
	user?: User;
};

export const ActionsDropdown: FC<Props> = ({ user }) => {
	const usersApi = new UsersApi();
	const matchMutate = useMatchMutate();

	const handleOnUserDiactivate = async () => {
		try {
			await usersApi.updateUser(user?.id, { isActive: false });
			message.success(`User ${user?.name} has been successfully deactivated.`);
			matchMutate(/^\/api\/v1\/users\//);
		} catch (error) {
			showError(error);
		}
	};

	const handleOnUserDelete = async () => {
		try {
			await usersApi.deleteUser(user?.id);
			message.success(`User ${user?.name} has been successfully deleted.`);
			matchMutate(/^\/api\/v1\/users\//);
		} catch (error) {
			showError(error);
		}
	};

	const menu = (
		<Menu
			items={[
				{
					label: 'Deactivate',
					key: '1',
					icon: <StopOutlined style={{ color: 'purple' }} />,
					onClick: handleOnUserDiactivate
				},
				{
					label: 'Delete',
					key: '2',
					icon: <DeleteFilled style={{ color: 'var(--brand-color)' }} />,
					onClick: handleOnUserDelete
				}
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<Button>
				<Space>
					Actions
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};
