import { FC } from 'react';
import Link from 'next/link';

export const ForgotPassword: FC = (): JSX.Element => {
	return (
		<div style={{ float: 'right' }}>
			<Link href="/" passHref>
				Forgot password
			</Link>
		</div>
	);
};
