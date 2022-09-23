import { PlusOutlined } from '@ant-design/icons';
import { DriverKarmaPoints } from '@proovia-crm/crm-api-types';
import { Button, Table } from 'antd';
import { isNil, omitBy } from 'lodash';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import {
	Container,
	CustomButton,
	CustomPageHeader,
	FilterButton,
	SearchForm,
	SelectFilter
} from '../../../components';
import CustomHead from '../../../components/Head';
import FilterDrawer from '../../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../../components/Table/types';
import { namedComponent } from '../../../config/dynamic-component';
import { pagination } from '../../../config/Table/PaginationSettings';
import { tableDefaults } from '../../../config/Table/TableDefaultProps';
import { useDrawer } from '../../../hooks/useDrawer';
import { useSearch } from '../../../hooks/useSearch';
import { useTableClear } from '../../../hooks/useTableClear';
import { useDriversKarmaPoints } from '../../../modules/drivers/karma/hooks/useDriversKarma';
import { StyledAlignment } from '../../../styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../components'), 'ResultError')
	)
};

function DriverKarmaPage() {
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<DriverKarmaPoints>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();

	const {
		data: karmaPoints,
		loading,
		error,
		updateFilters
	} = useDriversKarmaPoints({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(karmaPoints?.meta.filter || {}).length,
		[filteredInfo, karmaPoints?.meta.filter]
	);

	const columns: CustomColumnsType<DriverKarmaPoints> = [
		{
			title: 'Driver',
			dataIndex: 'name',
			key: 'name',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type driver's name"
					initialValue={karmaPoints?.meta.filter?.['name'] as string}
				/>
			)
		},
		{
			title: 'Karma Points',
			dataIndex: 'karma',
			key: 'karma',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'karma' ? sortedInfo.order : undefined
		},
		{
			title: 'Show Karma',
			key: 'actions',
			width: 150,
			align: 'center',
			render: (_, record) => (
				<Link href={`/drivers/${record.id}?activeTab=karma`} passHref>
					<Button>Show</Button>
				</Link>
			)
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
			<CustomHead title="Drivers karma" />
			<CustomPageHeader
				backIcon={false}
				title="Drivers Karma"
				extra={[
					<CustomButton
						key="addButton"
						url="/drivers/karma/create"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={karmaPoints?.meta}
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
					size="small"
					columns={columns}
					dataSource={karmaPoints?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize:
							paginationInfo?.pageSize || karmaPoints?.meta.itemsPerPage,
						total: karmaPoints?.meta?.totalItems,
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
							<SearchForm
								onChange={handleOnSearch}
								placeholder="Search driver karma"
							/>
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

export default DriverKarmaPage;
