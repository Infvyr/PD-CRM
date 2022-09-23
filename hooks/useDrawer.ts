import { useState } from 'react';

export const useDrawer = () => {
	const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false);
	const showDrawer = () => setDrawerVisible(true);
	const onClose = () => setDrawerVisible(false);

	return { showDrawer, onClose, isDrawerVisible };
};
