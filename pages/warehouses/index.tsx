import { PlusOutlined } from '@ant-design/icons';
import { Warehouse } from '@proovia-crm/crm-api-types';
import { Button, Table, Tag } from 'antd';
import { StyledAlignment } from 'apps/crm-app/styles';
import { isNil, omitBy } from 'lodash';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {
	Container,
	CustomButton,
	CustomPageHeader,
	FilterButton,
	SearchForm,
	SelectFilter
} from '../../components';
import CustomHead from '../../components/Head';
import FilterDrawer from '../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../components/Table/types';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import { tableDefaults } from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useSearch } from '../../hooks/useSearch';
import { useTableClear } from '../../hooks/useTableClear';
import { useWarehouses } from '../../modules/warehouse/hooks/useWarehouse';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

const MOCK_DATA: Warehouse[] = [
	{
		id: 1,
		name: 'Birmingham',
		address:
			'South Yardley Ward, Birmingham District (B), Birmingham, England, B33 8QE, United Kingdom',
		lat: 52.48,
		long: -1.81,
		isDefaultStart: true,
		isDefaultEnd: true,
		fullName: 'Stefan Vladescu'
	},
	{
		id: 2,
		name: 'London',
		address: '10 Downing Street, London, England, SW1A 2AA, United Kingdom',
		lat: 51.503038,
		long: -0.128371,
		isDefaultStart: false,
		isDefaultEnd: false,
		fullName: 'Ion Rata'
	},
	{
		id: 3,
		name: 'Birmingham',
		address:
			'10 Marischal Street, Aberdeen City, Aberdeen, Aberdeenshire, AB11 5AJ, Scotland',
		lat: 57.14672,
		long: -2.094164,
		isDefaultStart: true,
		isDefaultEnd: true,
		fullName: 'Tudor Velescu'
	},
	{
		id: 4,
		name: 'Birmingham',
		address:
			'South Yardley Ward, Birmingham District (B), Birmingham, England, B33 8QE, United Kingdom',
		lat: 52.48,
		long: -1.81,
		isDefaultStart: true,
		isDefaultEnd: true,
		fullName: 'Stefan Grigorescu'
	},
	{
		id: 5,
		name: 'Birmingham',
		address:
			'South Yardley Ward, Birmingham District (B), Birmingham, England, B33 8QE, United Kingdom',
		lat: 52.48,
		long: -1.81,
		isDefaultStart: true,
		isDefaultEnd: true,
		fullName: 'Marin Schiopu'
	}
];

function WarehousePage() {
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<Warehouse>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();

	const {
		data: warehouses,
		loading,
		error,
		updateFilters
	} = useWarehouses({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(warehouses?.meta.filter || {}).length,
		[filteredInfo, warehouses?.meta.filter]
	);

	const columns: CustomColumnsType<Warehouse> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 60,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type warehouse name"
					initialValue={warehouses?.meta.filter?.['name'] as string}
				/>
			)
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 300,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'address' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type warehouse address"
					initialValue={warehouses?.meta.filter?.['address'] as string}
				/>
			)
		},
		{
			title: 'Latitude',
			dataIndex: 'lat',
			key: 'lat',
			width: 50,
			sorter: true,
			sortOrder: sortedInfo?.columnKey === 'lat' ? sortedInfo.order : undefined
		},
		{
			title: 'Longitude',
			dataIndex: 'long',
			key: 'long',
			width: 50,
			sorter: true,
			sortOrder: sortedInfo?.columnKey === 'long' ? sortedInfo.order : undefined
		},
		{
			title: 'Start',
			dataIndex: 'isDefaultStart',
			key: 'isDefaultStart',
			width: 30,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'isDefaultStart'
					? sortedInfo.order
					: undefined,
			render: (_, record) =>
				record.isDefaultStart ? (
					<Tag color="success">Yes</Tag>
				) : (
					<Tag color="error">No</Tag>
				)
		},
		{
			title: 'End',
			dataIndex: 'isDefaultEnd',
			key: 'isDefaultEnd',
			width: 30,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'isDefaultEnd' ? sortedInfo.order : undefined,
			render: (_, record) =>
				record.isDefaultEnd ? (
					<Tag color="success">Yes</Tag>
				) : (
					<Tag color="error">No</Tag>
				)
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: 90,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'fullName' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type full name"
					initialValue={warehouses?.meta.filter?.['fullName'] as string}
				/>
			)
		}
	];

	/*if (error)
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
		);*/

	return (
		<>
			<CustomHead title="Warehouses" />
			<CustomPageHeader
				backIcon={false}
				title="Warehouses"
				extra={[
					<CustomButton
						key="addButton"
						url="/warehouses/"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={warehouses?.meta}
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
					scroll={{ x: 1300 }}
					columns={columns}
					dataSource={MOCK_DATA}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize: paginationInfo?.pageSize || warehouses?.meta.itemsPerPage,
						total: warehouses?.meta?.totalItems,
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
								placeholder="Search warehouses"
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

export default WarehousePage;
