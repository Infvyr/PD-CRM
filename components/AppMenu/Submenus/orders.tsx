import Link from 'next/link';

export const ORDERS = {
	label: 'Orders',
	key: 'orders',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/orders" passHref>
					All Orders
				</Link>
			),
			key: 'ordersItem1'
		},
		{
			label: (
				<Link href="/orders/create" passHref>
					Create order
				</Link>
			),
			key: 'ordersItem2'
		},
		{
			label: (
				<Link href="/orders/orders-history" passHref>
					Orders history
				</Link>
			),
			key: 'ordersItem3'
		}
	]
};
