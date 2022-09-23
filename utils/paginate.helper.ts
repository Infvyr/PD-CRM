import {
	PaginateQueryConfig,
	PaginateQueryParams,
	Sorter,
	SortOrderMap
} from '@proovia-crm/crm-api-types';
import { FilterValue } from 'antd/lib/table/interface';
import { mapKeys } from 'lodash';
import { stringify } from 'querystring';

const sortOrderMap: SortOrderMap = {
	ascend: 'ASC',
	descend: 'DESC'
};

export function buildQueryOptions<T, MultipleSorter extends boolean = false>(
	config?: PaginateQueryConfig<T, MultipleSorter>
): string {
	if (!config) {
		return '';
	}

	const paginateQuery = transformToPaginateQueryParams(config);

	const {
		sortBy = [],
		search,
		searchBy = [],
		filter,
		limit,
		page
	} = paginateQuery;

	const pageQuery = page ? `&page=${page}` : '';
	const limitQuery = limit ? `&limit=${limit}` : '';

	const sortByQuery = sortBy
		.map((order) => `&sortBy=${order.join(':')}`)
		.join('');
	const searchQuery = search ? `&search=${search}` : '';

	const searchByQuery =
		searchBy && searchBy.length
			? searchBy.map((column) => `&searchBy=${column}`).join('')
			: '';

	const filterQuery = filter
		? '&' +
		  stringify(
				mapKeys(filter, (_param, name) => 'filter.' + name),
				'&',
				'=',
				{ encodeURIComponent: (str) => str }
		  )
		: '';

	let options = `${pageQuery}${limitQuery}${sortByQuery}${searchQuery}${searchByQuery}${filterQuery}`;
	options = options.replace(/^&+|&+$/g, '');

	return options;
}

function transformToPaginateQueryParams<
	T,
	MultipleSorter extends boolean = false
>({
	pagination,
	sorter,
	filters,
	search,
	searchBy
}: PaginateQueryConfig<T, MultipleSorter>): PaginateQueryParams {
	const page = pagination?.current;
	const limit = pagination?.pageSize;
	const sortBy = transformSorter(sorter);
	const filter = transformFilter(filters);

	return { page, limit, sortBy, filter, search, searchBy };
}

function transformSorter<T, MultipleSorter extends boolean = false>(
	sorter?: Sorter<T, MultipleSorter>
): PaginateQueryParams['sortBy'] {
	const sortBy: [string, string][] = [];
	if (Array.isArray(sorter)) {
		sorter.forEach((sorterItem) => {
			const { column, order, field } = sorterItem;
			if (column && field && order) {
				sortBy.push([
					Array.isArray(field) ? field.join('.') : `${field}`,
					sortOrderMap[order]
				]);
			}
		});
	} else {
		if (sorter && sorter.column && sorter.field && sorter.order) {
			if (sorter.order) {
				sortBy.push([
					Array.isArray(sorter.field)
						? sorter.field.join('.')
						: `${sorter.field}`,
					sortOrderMap[sorter.order]
				]);
			}
		}
	}
	return sortBy;
}

function transformFilter(
	filters: Record<string, string | number | boolean | FilterValue | null> = {}
): PaginateQueryParams['filter'] {
	const result: PaginateQueryParams['filter'] = {};
	Object.keys(filters).forEach((key) => {
		const filterValue = filters[key];
		if (filterValue !== undefined && filterValue !== null) {
			result[key] = Array.isArray(filterValue)
				? `$in:${filterValue}`
				: `${filterValue}`;
		}
	});
	return result;
}
