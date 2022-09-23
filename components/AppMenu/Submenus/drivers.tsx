import Link from 'next/link';

export const DRIVERS = {
	label: 'Drivers',
	key: 'drivers',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/drivers/activity-report" passHref>
					Activity Report
				</Link>
			),
			key: 'driverItem1'
		}
	]
};
