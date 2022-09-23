import Link from 'next/link';

export const ADMIN = {
	label: 'Admin',
	key: 'admin',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/customers/addresses" passHref>
					Addresses
				</Link>
			),
			key: 'adminItem1'
		},
		{
			label: (
				<Link href="/customers" passHref>
					Customers
				</Link>
			),
			key: 'adminItem2'
		},
		{
			label: (
				<Link href="/customers/create/customer" passHref>
					Create Customer
				</Link>
			),
			key: 'adminItem3'
		},
		{
			label: (
				<Link href="/customers/create/address" passHref>
					Create Address
				</Link>
			),
			key: 'adminItem4'
		}
	]
};
