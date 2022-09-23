import { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StyledMenu } from './AppMenu.styles';
import { ADMIN, CLAIMS, DRIVERS, KARMA, ORDERS, WAREHOUSE } from './Submenus';

const items: MenuProps['items'] = [
	ADMIN,
	CLAIMS,
	DRIVERS,
	KARMA,
	ORDERS,
	WAREHOUSE
];

export const AppMenu = (): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		if (router.pathname === '/dashboard') {
			const primaryMenu = document.getElementById('primary-menu');
			const primaryMenuItems = primaryMenu?.querySelectorAll('.mainMenuItem');

			primaryMenuItems?.forEach((item) => {
				if (item.classList.contains('ant-menu-submenu-selected')) {
					item.classList.remove('ant-menu-submenu-selected');
				}
			});
		}
	}, [router.pathname]);

	return <StyledMenu id="primary-menu" mode="horizontal" items={items} />;
};
