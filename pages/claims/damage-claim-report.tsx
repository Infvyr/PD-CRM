import { PlusOutlined } from '@ant-design/icons';
import {
	Claim,
	CLAIM_STATUS_OPTIONS,
	PAYMENT_STATUS_OPTIONS,
	PAYMENT_TYPE_OPTIONS
} from '@proovia-crm/crm-api-types';
import { Button, Dropdown, Menu, Table, Tag, Tooltip } from 'antd';
import millify from 'millify';
import { addedTimeOptions } from '../../config/Filter/time-options';
import { StyledAlignment } from '../../styles';
import { isNil, omitBy, startCase } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
	CheckboxFilter,
	Container,
	CustomButton,
	CustomPageHeader,
	DateRangeFilter,
	DriverFilter,
	FilterButton,
	PriceRange,
	SearchForm,
	SelectFilter
} from '../../components';
import CustomHead from '../../components/Head';
import FilterDrawer from '../../components/Table/FilterDrawer/index';
import { CustomColumnsType } from '../../components/Table/types';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../config/date-format';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import {
	scrollDefaults,
	tableDefaults
} from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useTableClear } from '../../hooks/useTableClear';
import { useClaims } from '../../modules/claims/hooks/useClaims';
import { useSearch } from '../../hooks/useSearch';

const Dynamic = {
	Overview: dynamic(() =>
		namedComponent(import('../../modules/claims/Overview'), 'Overview')
	),
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

function ClaimsPage() {
	const router = useRouter();

	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<Claim>();

	const [rowData, setRowData] = useState<Claim>();
	const { search, handleOnSearch } = useSearch();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();
	const {
		isDrawerVisible: isDrawerContextVisible,
		showDrawer: showContextDrawer,
		onClose: onContextClose
	} = useDrawer();

	const {
		data: claims,
		loading,
		error,
		updateFilters
	} = useClaims({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(claims?.meta.filter || {}).length,
		[filteredInfo, claims?.meta.filter]
	);

	const handleOnRowClick = useCallback(
		(data: Claim) => {
			const selection =
				window &&
				typeof window === 'object' &&
				window.getSelection()?.toString();

			if (!selection) return router.push(`/claims/edit/${data.id}`);
		},
		[router]
	);

	const renderCell = (cellContent: ReactNode, record: Claim) => (
		<Dropdown
			overlay={
				<Menu
					items={[
						{
							key: 'show-details',
							label: (
								<Button
									type="link"
									onClick={(e) => {
										e.stopPropagation();
										showContextDrawer();
										setRowData(record);
									}}
								>
									Show details
								</Button>
							)
						},
						{
							key: 'edit',
							label: (
								<Button
									type="link"
									onClick={(e) => {
										e.stopPropagation();
										return router.push(`/claims/edit/${record?.id}`);
									}}
								>
									{`Edit ${record?.order ?? ''}`}
								</Button>
							)
						}
					]}
				/>
			}
			trigger={['contextMenu']}
			className="table--context-menu"
			overlayClassName={`table--context-menu-overlay ${
				isDrawerContextVisible && 'hide'
			}`}
			destroyPopupOnHide
		>
			<div>{cellContent}</div>
		</Dropdown>
	);

	const columns: CustomColumnsType<Claim> = [
		{
			title: 'Order',
			dataIndex: 'order',
			key: 'order',
			fixed: 'left',
			width: 40,
			sortOrder:
				sortedInfo?.columnKey === 'order' ? sortedInfo.order : undefined,
			sorter: true,
			customFilter: ({ column }) => (
				<SelectFilter
					column={column}
					placeholder="Type order number"
					initialValue={claims?.meta.filter?.['order'] as string}
				/>
			),
			render: (text, record) => renderCell(text, record)
		},
		{
			title: 'Claim Status',
			dataIndex: 'status',
			key: 'status',
			width: 80,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'status' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={CLAIM_STATUS_OPTIONS}
					initialValue={claims?.meta.filter?.['status'] as string}
				/>
			),
			render: (text, record) => renderCell(startCase(text), record)
		},
		{
			title: 'Payment Type',
			dataIndex: 'paymentType',
			key: 'paymentType',
			responsive: ['md'],
			width: 60,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'paymentType' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={PAYMENT_TYPE_OPTIONS}
					initialValue={claims?.meta.filter?.['paymentType'] as string}
				/>
			),
			render: (text, record) => renderCell(startCase(text), record)
		},
		{
			title: 'Payment Status',
			dataIndex: 'orderPaid',
			key: 'orderPaid',
			width: 60,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'orderPaid' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={PAYMENT_STATUS_OPTIONS}
					initialValue={claims?.meta.filter?.['orderPaid'] as string}
				/>
			),
			render: (_, record) =>
				record?.orderPaid
					? renderCell(<Tag color="green">PAID</Tag>, record)
					: renderCell(<Tag color="red">UNPAID</Tag>, record)
		},
		{
			title: 'Customer Amount',
			dataIndex: 'customerClaimAmount',
			key: 'customerClaimAmount',
			width: 60,
			sorter: true,
			ellipsis: true,
			sortOrder:
				sortedInfo?.columnKey === 'customerClaimAmount'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<PriceRange
					{...props}
					initialValue={claims?.meta.filter?.['customerClaimAmount'] as string}
				/>
			),
			render: (text, record) =>
				renderCell(
					`${millify(record?.customerClaimAmount, {
						precision: 3,
						units: ['£', '£', '£', '£', '£', '£'],
						space: true
					})}`,
					record
				)
		},
		{
			title: 'Settled Amount',
			dataIndex: 'settledAmount',
			key: 'settledAmount',
			width: 60,
			sorter: true,
			ellipsis: true,
			sortOrder:
				sortedInfo?.columnKey === 'settledAmount'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<PriceRange
					{...props}
					initialValue={claims?.meta.filter?.['settledAmount'] as string}
				/>
			),
			render: (text, record) =>
				renderCell(
					`${millify(record?.settledAmount, {
						precision: 3,
						units: ['£', '£', '£', '£', '£', '£'],
						space: true
					})}`,
					record
				)
		},
		{
			title: 'Collection Driver',
			dataIndex: ['collectionDriver', 'name'],
			key: 'collectionDriver.name',
			width: 90,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'collectionDriver.name'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<DriverFilter
					{...props}
					placeholder="Type driver's name"
					initialValue={
						claims?.meta.filter?.['collectionDriver.name'] as string
					}
				/>
			),
			render: (text, record) => renderCell(text, record)
		},
		{
			title: 'Delivery Driver',
			width: 90,
			dataIndex: ['deliveryDriver', 'name'],
			key: 'deliveryDriver.name',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'deliveryDriver.name'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<DriverFilter
					{...props}
					placeholder="Type driver's name"
					initialValue={claims?.meta.filter?.['deliveryDriver.name'] as string}
				/>
			),
			render: (text, record) => renderCell(text, record)
		},
		{
			title: 'Guilty Driver',
			width: 90,
			dataIndex: ['guiltyDriver', 'name'],
			key: 'guiltyDriver.name',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'guiltyDriver.name'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<DriverFilter
					{...props}
					placeholder="Type driver's name"
					initialValue={claims?.meta.filter?.['guiltyDriver.name'] as string}
				/>
			),
			render: (text, record) => renderCell(text, record)
		},
		{
			title: 'Guilty Warehouse',
			width: 65,
			dataIndex: 'isWarehouseGuilty',
			key: 'isWarehouseGuilty',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'isWarehouseGuilty'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={[
						{ label: 'Yes', value: 1 },
						{ label: 'No', value: 0 }
					]}
					initialValue={claims?.meta.filter?.['isWarehouseGuilty'] as string}
				/>
			),
			render: (value, record) =>
				renderCell(
					<Tag color={value ? 'red' : 'green'}>{value ? 'Yes' : 'No'}</Tag>,
					record
				)
		},
		{
			title: 'Settled Time',
			dataIndex: 'settledTime',
			key: 'settledTime',
			width: 60,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'settledTime' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={claims?.meta.filter?.['settledTime'] as string}
				/>
			),
			render: (_, record) =>
				renderCell(
					<>
						{record?.settledTime ? (
							<Tooltip
								title={moment(record.settledTime).format(DATE_TIME_FORMAT)}
							>
								{moment(record.settledTime).format(DATE_FORMAT)}
							</Tooltip>
						) : null}
					</>,
					record
				)
		},
		{
			title: 'Added time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 60,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={claims?.meta.filter?.['createdAt'] as string}
				/>
			),
			render: (_, record) =>
				renderCell(
					<>
						{record?.createdAt ? (
							<Tooltip
								title={moment(record.createdAt).format(DATE_TIME_FORMAT)}
							>
								{moment(record.createdAt).format(DATE_FORMAT)}
							</Tooltip>
						) : null}
					</>,
					record
				)
		},
		{
			title: 'Added User',
			dataIndex: ['createdByUser', 'name'],
			key: 'createdByUser.name',
			width: 80,
			responsive: ['md'],
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdByUser.name'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type user's name"
					initialValue={claims?.meta.filter?.['createdByUser.name'] as string}
				/>
			),
			render: (text, record) => renderCell(text, record)
		}
	];

	if (error) return <Dynamic.ResultError />;

	return (
		<>
			<CustomHead title="Damage claim report" />
			<CustomPageHeader
				backIcon={false}
				title="Damage claim report"
				extra={[
					<CustomButton
						key="addButton"
						url="/claims/create/damage-claim"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={claims?.meta}
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
				<Table<Claim>
					{...tableDefaults}
					className="ant-table--clickable ant-table--context-menu ant-table--fixed-pagination"
					scroll={scrollDefaults}
					size="small"
					columns={columns}
					dataSource={claims?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						pageSize: paginationInfo?.pageSize || claims?.meta.itemsPerPage,
						total: claims?.meta?.totalItems,
						position: ['bottomRight'],
						...pagination,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} claims`,
						defaultPageSize: 20,
						onShowSizeChange: (current, size) =>
							updateFilters({
								pagination: { ...paginationInfo, pageSize: size }
							})
					}}
					onRow={(data) => ({
						onClick: () => handleOnRowClick(data)
					})}
					title={() => (
						<StyledAlignment
							display="inline-flex"
							justifyContent="space-between"
							width="100%"
						>
							<SearchForm
								onChange={handleOnSearch}
								placeholder="Search claims"
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
				<Dynamic.Overview
					record={rowData!}
					onClose={onContextClose}
					isDrawerVisible={isDrawerContextVisible}
				/>
			</Container>
		</>
	);
}

export default ClaimsPage;
