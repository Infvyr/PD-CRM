import { MouseEvent } from 'react';

export const useClickPreventionOnTableRowClick = () => {
	const handleRowClick = (
		e: MouseEvent<HTMLInputElement>,
		callback: () => void,
		defaultCssClass: string = 'unclickable'
	) => {
		const target = e.target as Element;

		const selection =
			window && typeof window === 'object' && window.getSelection()?.toString();

		if (target.className !== defaultCssClass) {
			if (!selection) {
				callback();
			}
		}
	};

	return { handleRowClick };
};
