import {
	FilterValue,
	SorterResult,
	TableCurrentDataSource
} from 'antd/lib/table/interface';
import { useState, useCallback } from 'react';
import { TablePaginationConfig } from 'antd';
import { Sorter } from '@proovia-crm/crm-api-types';

export const useTableClear = <T, MultipleSorter extends boolean = false>(
	paginationInitialState?: TablePaginationConfig,
	filterInitialState?: Record<
		string,
		string | number | boolean | FilterValue | null
	>,
	sorterInitialState?: Sorter<T, MultipleSorter>
) => {
	const [filteredInfo, setFilteredInfo] = useState(filterInitialState);
	const [sortedInfo, setSortedInfo] = useState(sorterInitialState);
	const [paginationInfo, setPaginationInfo] = useState(paginationInitialState);

	const clearFilters = () => setFilteredInfo(filterInitialState);

	const clearAll = () => {
		setFilteredInfo(filterInitialState);
		setSortedInfo(sorterInitialState);
		setPaginationInfo({ ...paginationInfo, current: 1 });
	};

	const handleOnChange = useCallback(
		(
			pagination: TablePaginationConfig,
			filters: Record<string, FilterValue | null>,
			sorter: SorterResult<T> | SorterResult<T>[],
			extra: TableCurrentDataSource<T>
		) => {
			setPaginationInfo(pagination);
			setSortedInfo(sorter as Sorter<T, MultipleSorter>);
			setFilteredInfo((prev) => ({ ...prev, ...filters }));
		},
		[]
	);

	return {
		filteredInfo,
		sortedInfo,
		setFilteredInfo,
		setSortedInfo,
		paginationInfo,
		setPaginationInfo,
		handleOnChange,
		clearFilters,
		clearAll
	};
};
