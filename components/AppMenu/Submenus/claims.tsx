import Link from 'next/link';

export const CLAIMS = {
	label: 'Claims',
	key: 'claims',
	icon: '',
	className: 'mainMenuItem',
	popupClassName: 'mainMenuSub',
	children: [
		{
			label: (
				<Link href="/claims/damage-claim-report" passHref>
					Damage Claim Report
				</Link>
			),
			key: 'claimsItem1'
		},
		{
			label: (
				<Link href="/claims/create/damage-claim" passHref>
					Damage Claim
				</Link>
			),
			key: 'claimsItem2'
		},
		{
			label: (
				<Link href="/claims/todos/outstanding" passHref>
					Outstanding ToDos
				</Link>
			),
			key: 'claimsItem3'
		},
		{
			label: (
				<Link href="/claims/todos" passHref>
					All ToDos
				</Link>
			),
			key: 'claimsItem4'
		}
	]
};
