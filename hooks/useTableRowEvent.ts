import { MouseEvent, useState } from 'react';
import { useDrawer } from './useDrawer';

export const useTableRowEvent = () => {
	const [driverName, setDriverName] = useState<string>('');
	const { showDrawer } = useDrawer();

	const handleRowClick = (
		e: MouseEvent<HTMLInputElement>,
		value: string,
		cssClass: string
	) => {
		setDriverName(value);
		const target = e.target as Element;
		if (target.className !== cssClass) {
			showDrawer();
		}
	};

	return { driverName, handleRowClick };
};
