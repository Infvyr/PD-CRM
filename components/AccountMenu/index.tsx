import {
	LogoutOutlined,
	SettingOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { AuthApi } from '../../api/auth.api';
import AuthContext from '../../context/AuthProvider';
import { StyledAlignment } from '../../styles';
import { StyledButton, StyledUser } from './AccountMenu.styles';

const authentication = new AuthApi();

export const AccountMenu: FC = (): JSX.Element => {
	const { user } = useContext(AuthContext);
	const router = useRouter();

	const UserMenu: ItemType[] = [
		{
			type: 'group',
			label: (
				<Button
					type="link"
					icon={<LogoutOutlined />}
					onClick={() => {
						authentication
							.logout()
							.then(() => router.replace('/'))
							.catch(() => {
								return message.error(
									'There are an error on the server! You will not be sign out yet.'
								);
							});
					}}
				>
					Sign out
				</Button>
			)
		}
	];
	const DropDownUserMenu = <Menu items={UserMenu} />;

	return (
		<>
			<StyledAlignment display="inline-flex" alignContent="center">
				<Space>
					<Link href="/admin/users" passHref>
						<Tooltip placement="left" title="Administration">
							<Button
								shape="circle"
								type="primary"
								icon={<SettingOutlined />}
							/>
						</Tooltip>
					</Link>
					<Dropdown
						overlay={DropDownUserMenu}
						placement="bottomRight"
						overlayClassName="dropdown-menu-user"
					>
						<StyledButton
							type="link"
							onClick={(e) => e.preventDefault()}
							style={{ padding: 0 }}
						>
							{user?.name && <StyledUser>{user.name}</StyledUser>}
							<Avatar size={{ xs: 30 }} icon={<UserOutlined />} />
						</StyledButton>
					</Dropdown>
				</Space>
			</StyledAlignment>
		</>
	);
};
