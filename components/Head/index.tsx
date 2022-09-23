import { FC, ReactNode } from 'react';
import Head from 'next/head';

type Props = {
	title?: string;
	description?: string;
	children?: ReactNode;
};

const CustomHead: FC<Props> = ({
	title = 'Proovia CRM',
	description,
	children
}): JSX.Element => {
	return (
		<Head>
			<title>{`Proovia CRM - ${title}`}</title>
			{description && <meta name="description" content={description} />}
			{children}
		</Head>
	);
};

export default CustomHead;
