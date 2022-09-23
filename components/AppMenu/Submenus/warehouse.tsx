import Link from 'next/link';

export const WAREHOUSE = {
	label: 'Warehouse',
	key: 'warehouse',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/warehouses/" passHref>
					Warehouses
				</Link>
			),
			key: 'warehouseItem1'
		},
		{
			label: (
				<Link href="/warehouses/locations" passHref>
					Warehouse Locations
				</Link>
			),
			key: 'warehouseItem2'
		}
	]
};
