import { useState, useCallback } from 'react';

export const useTablePagination = () => {
	const [pageIndex, setPageIndex] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);

	const handlePageChange = useCallback((page: number, pageSize: number) => {
		setPageIndex(page);
		setPageSize(pageSize);
	}, []);

	return { pageIndex, pageSize, handlePageChange };
};
