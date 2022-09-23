import { PlusOutlined } from '@ant-design/icons';
import { DATE_OPTION, DriverKarmas } from '@proovia-crm/crm-api-types';
import { Button, CheckboxOptionType, Table } from 'antd';
import { isNil, omitBy } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useContext, useMemo } from 'react';
import {
	CustomButton,
	DateRangeFilter,
	FilterButton,
	SearchForm
} from '../../../components';
import CustomHead from '../../../components/Head';
import FilterDrawer from '../../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../../components/Table/types';
import { DATE_FORMAT } from '../../../config/date-format';
import { namedComponent } from '../../../config/dynamic-component';
import { pagination } from '../../../config/Table/PaginationSettings';
import {
	scrollDefaults,
	tableDefaults
} from '../../../config/Table/TableDefaultProps';
import { useDrawer } from '../../../hooks/useDrawer';
import { useSearch } from '../../../hooks/useSearch';
import { useTableClear } from '../../../hooks/useTableClear';
import { StyledAlignment } from '../../../styles';
import DriverActivityContext from '../context/DriverActivity.context';
import { useDriverKarma } from './hooks/useDriversKarma';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../components'), 'ResultError')
	)
};

export const DriverKarma = () => {
	const { id } = useContext(DriverActivityContext);
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<DriverKarmas>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();
	const {
		data: driverKarma,
		loading,
		error,
		updateFilters
	} = useDriverKarma(id, {
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const addedTimeOptions: CheckboxOptionType[] = [
		{ label: 'Today', value: DATE_OPTION.TODAY },
		{ label: 'Last 7 days', value: DATE_OPTION.LAST_7DAYS },
		{ label: 'Last 30 days', value: DATE_OPTION.LAST_30DAYS }
	];

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(driverKarma?.meta.filter || {}).length,
		[filteredInfo, driverKarma?.meta.filter]
	);

	const columns: CustomColumnsType<DriverKarmas> = [
		{
			title: 'Date',
			dataIndex: 'committedOn',
			key: 'committedOn',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'committedOn' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={driverKarma?.meta.filter?.['committedOn'] as string}
				/>
			),
			render: (text: string, record) =>
				moment(record?.committedOn).format(DATE_FORMAT)
		},
		{
			title: 'Sin',
			key: 'sin',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'karmaRule' ? sortedInfo.order : undefined,
			render: (_, record) => Object.values(record?.karmaRule?.rule)
		},
		{
			title: 'Penalty Points',
			dataIndex: 'karmaPoints',
			key: 'karmaPoints',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'karmaPoints' ? sortedInfo.order : undefined
		},
		{
			title: 'Comment',
			dataIndex: 'comments',
			key: 'comments',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'comments' ? sortedInfo.order : undefined,
			render: (_, record) => record?.comments ?? '-'
		}
	];

	if (error) return <Dynamic.ResultError error={error} />;

	return (
		<>
			<CustomHead title="Driver karma" />
			{driverKarma && driverKarma?.data.length > 0 && (
				<StyledAlignment
					display="inline-flex"
					justifyContent="space-between"
					width="100%"
				>
					<SearchForm
						onChange={handleOnSearch}
						placeholder="Search driver karma"
					/>
					<StyledAlignment
						display="inline-flex"
						gap="1rem"
						style={{ marginBottom: '1rem' }}
					>
						{Boolean(filterCount) && (
							<Button
								onClick={() => {
									updateFilters({ filters: undefined });
									clearAll();
								}}
							>
								Clear filters
							</Button>
						)}
						<FilterButton
							text="Filters"
							filterCount={filterCount}
							onClick={showDrawer}
						/>
						<CustomButton url="/drivers/karma/create" icon={<PlusOutlined />} />
					</StyledAlignment>
				</StyledAlignment>
			)}

			<FilterDrawer
				meta={driverKarma?.meta}
				onSearch={(value) => {
					setFilteredInfo((prev) => ({ ...prev, ...value }));
					updateFilters({ filters: value });
					setPaginationInfo((prev) => ({ ...prev, current: 1 }));
					onClose();
				}}
				visible={isDrawerVisible}
				columns={columns}
				onClose={onClose}
			/>

			<Table
				style={{ minHeight: 'auto' }}
				{...tableDefaults}
				{...scrollDefaults}
				className="ant-table--fixed-pagination ant-table--bottom-space"
				size="small"
				columns={columns}
				dataSource={driverKarma?.data}
				onChange={handleOnChange}
				loading={loading}
				rowKey={(record) => record.id}
				pagination={{
					...paginationInfo,
					...pagination,
					defaultPageSize: 12,
					pageSize:
						12 || paginationInfo?.pageSize || driverKarma?.meta.itemsPerPage,
					total: driverKarma?.meta?.totalItems,
					position: ['bottomRight'],
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
					onShowSizeChange: (current, size) =>
						updateFilters({
							pagination: { ...paginationInfo, pageSize: size }
						})
				}}
			/>
		</>
	);
};
