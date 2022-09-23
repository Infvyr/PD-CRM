import { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { FC, Key, ReactNode } from 'react';
import { StyledSideMenu, StyledSider } from './SideMenu.styles';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem(
		'Users and Control',
		'g1',
		null,
		[
			getItem('Users', 'users'),
			getItem('Roles', 'roles'),
			getItem('Profiles', 'profiles'),
			getItem('Permissions', 'permissions')
		],
		'group'
	)
];

const SideMenu: FC = () => {
	const router = useRouter();
	const onClick: MenuProps['onClick'] = (e) => router.push(`/admin/${e.key}`);

	const defaultSelectedKey = router.asPath.split('/admin/')[1];

	return (
		<StyledSider>
			<StyledSideMenu
				onClick={onClick}
				defaultSelectedKeys={[`${defaultSelectedKey}`]}
				defaultOpenKeys={['sub1']}
				mode="inline"
				items={items}
			/>
		</StyledSider>
	);
};

export default SideMenu;
