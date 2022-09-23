import { FC } from 'react';

export const CustomCell: FC = ({ children }): JSX.Element => {
	return <span className="unclickable">{children}</span>;
};
