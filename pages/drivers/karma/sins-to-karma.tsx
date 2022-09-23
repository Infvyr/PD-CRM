import { PlusOutlined } from '@ant-design/icons';
import { DATE_OPTION, DriverKarmas } from '@proovia-crm/crm-api-types';
import { Button, CheckboxOptionType, Table } from 'antd';
import { isNil, omitBy } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {
	Container,
	CustomButton,
	CustomPageHeader,
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
import { useDriversKarma } from '../../../modules/drivers/karma/hooks/useDriversKarma';
import { StyledAlignment } from '../../../styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../components'), 'ResultError')
	)
};

function DriversSinsToKarmaPage() {
	const {
		filteredInfo,
		sortedInfo,
		paginationInfo,
		setFilteredInfo,
		setPaginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<DriverKarmas>();
	const { search, handleOnSearch } = useSearch();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();
	const {
		data: driversKarma,
		loading,
		error,
		updateFilters
	} = useDriversKarma({
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
			Object.keys(driversKarma?.meta.filter || {}).length,
		[filteredInfo, driversKarma?.meta.filter]
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
					initialValue={driversKarma?.meta.filter?.['committedOn'] as string}
				/>
			),
			render: (text: string, record) =>
				moment(record?.committedOn).format(DATE_FORMAT)
		},
		{
			title: 'Sin',
			key: 'karmaRule',
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

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Button type="primary" onClick={() => window.location.reload()}>
						Reload the page
					</Button>
				}
			/>
		);

	return (
		<>
			<CustomHead title="Drivers sins to karma" />
			<CustomPageHeader
				backIcon={false}
				title="Drivers sins to karma"
				extra={[
					<CustomButton
						key="addButton"
						url="/drivers/karma/create"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={driversKarma?.meta}
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

			<Container>
				<Table
					{...tableDefaults}
					className="ant-table--fixed-pagination ant-table-small-default"
					scroll={scrollDefaults}
					size="small"
					columns={columns}
					dataSource={driversKarma?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize:
							paginationInfo?.pageSize || driversKarma?.meta.itemsPerPage,
						total: driversKarma?.meta?.totalItems,
						position: ['bottomRight'],
						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
						onShowSizeChange: (current, size) =>
							updateFilters({
								pagination: { ...paginationInfo, pageSize: size }
							})
					}}
					title={() => (
						<StyledAlignment
							display="inline-flex"
							justifyContent="space-between"
							width="100%"
						>
							<SearchForm onChange={handleOnSearch} placeholder="Search sins" />
							<StyledAlignment display="inline-flex" gap="1rem">
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
							</StyledAlignment>
						</StyledAlignment>
					)}
				/>
			</Container>
		</>
	);
}

export default DriversSinsToKarmaPage;
