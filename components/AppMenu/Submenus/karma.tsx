import Link from 'next/link';

export const KARMA = {
	label: 'Karma',
	key: 'driversKarma',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/drivers/karma/create" passHref>
					Create Karma
				</Link>
			),
			key: 'karmaItem1'
		},
		{
			label: (
				<Link href="/drivers/karma/rules/create" passHref>
					Create Karma Rule
				</Link>
			),
			key: 'karmaItem2'
		},
		{
			label: (
				<Link href="/drivers/karma/sins-to-karma" passHref>
					Driver sins to karma
				</Link>
			),
			key: 'karmaItem3'
		},
		{
			label: (
				<Link href="/drivers/karma/rules" passHref>
					Karma rules
				</Link>
			),
			key: 'karmaItem4'
		},
		{
			label: (
				<Link href="/drivers/karma" passHref>
					Drivers Karma
				</Link>
			),
			key: 'karmaItem5'
		}
	]
};
