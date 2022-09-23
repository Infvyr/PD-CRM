import { PlusOutlined } from '@ant-design/icons';
import {
	DATE_OPTION,
	ORDER_PAYMENT_STATUS_OPTIONS,
	ORDER_STATUS_OPTIONS,
	Order,
	PAYMENT_TYPE_OPTIONS,
	TERMS_CONDITIONS_OPTIONS,
	ORDER_INVOICED_OPTIONS
} from '@proovia-crm/crm-api-types';
import { Button, CheckboxOptionType, Table, Tag } from 'antd';
import { isNil, omitBy } from 'lodash';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import {
	CheckboxFilter,
	Container,
	CustomButton,
	CustomPageHeader,
	DateRangeFilter,
	FilterButton,
	InputFilter,
	NumberRange,
	PriceRange,
	SearchForm,
	SelectFilter
} from '../../components';
import CustomHead from '../../components/Head';
import FilterDrawer from '../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../components/Table/types';
import { DATE_TIME_FORMAT } from '../../config/date-format';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import { tableDefaults } from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useSearch } from '../../hooks/useSearch';
import { useTableClear } from '../../hooks/useTableClear';
import { MOCK_ORDERS } from '../../modules/orders/constants/mock-data';
import { useOrders } from '../../modules/orders/hooks/useOrders';
import { StyledAlignment } from '../../styles';
import { momentFormatDateTime } from '../../utils/convertMomentToHuman';
import {
	AmountOfThings,
	LinkToResource,
	RenderList
} from '../../utils/table.utils';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

function AllOrdersPage() {
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<Order>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();
	const {
		data: orders,
		loading,
		error,
		updateFilters
	} = useOrders({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(orders?.meta.filter || {}).length,
		[filteredInfo, orders?.meta.filter]
	);

	const addedTimeOptions: CheckboxOptionType[] = [
		{ label: 'Today', value: DATE_OPTION.TODAY },
		{ label: 'Last 7 days', value: DATE_OPTION.LAST_7DAYS },
		{ label: 'Last 30 days', value: DATE_OPTION.LAST_30DAYS }
	];

	const columns: CustomColumnsType<Order> = [
		{
			title: 'Change Location',
			key: 'changeLocation',
			align: 'center',
			width: 160,
			render: () => (
				<Link href="#" passHref>
					<Button>Change location</Button>
				</Link>
			)
		},
		{
			title: 'Cancellation Reason',
			dataIndex: 'cancellationReason',
			key: 'cancellationReason',
			width: 180,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type cancel reason"
					initialValue={orders?.meta.filter?.['cancellationReason'] as string}
				/>
			)
		},
		{
			title: 'ID',
			dataIndex: 'zohoId',
			key: 'zohoId',
			ellipsis: true,
			width: 150,
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type zoho order id"
					initialValue={orders?.meta.filter?.['zohoId'] as string}
				/>
			)
		},
		{
			title: 'Track Order',
			dataIndex: 'trackOrder',
			key: 'trackOrder',
			ellipsis: true,
			width: 150,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					type="url"
					placeholder="Type track order link"
					initialValue={orders?.meta.filter?.['trackOrder'] as string}
				/>
			),
			render: (_, record) =>
				LinkToResource(
					record?.trackOrder as string,
					(record?.zohoId as string) || (record?.trackOrder as string)
				)
		},
		{
			title: 'Driver Total',
			dataIndex: 'driverTotal',
			key: 'driverTotal',
			width: 120,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<NumberRange
					{...props}
					prefix="£"
					initialValue={orders?.meta.filter?.['driverTotal'] as string}
				/>
			),
			render: (text, record) => (record?.driverTotal ? `£${text}` : '-')
		},
		{
			title: 'Tasks Report',
			dataIndex: 'taskReport',
			key: 'taskReport',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					type="url"
					placeholder="Type task report link"
					initialValue={orders?.meta.filter?.['taskReport'] as string}
				/>
			),
			render: (_, record) =>
				LinkToResource(record?.taskReport as string, 'View')
		},
		{
			title: 'Order Number',
			dataIndex: 'orderId',
			key: 'orderId',
			width: 130,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type order number"
					initialValue={orders?.meta.filter?.['orderId'] as string}
				/>
			)
		},
		{
			title: 'Order Description',
			dataIndex: 'description',
			key: 'description',
			width: 500,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type order description"
					initialValue={orders?.meta.filter?.['description'] as string}
				/>
			)
		},
		{
			title: 'T&C Status',
			dataIndex: 'termsAndConditionsStatus',
			key: 'termsAndConditionsStatus',
			width: 140,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={TERMS_CONDITIONS_OPTIONS}
					initialValue={
						orders?.meta.filter?.['termsAndConditionsStatus'] as string
					}
				/>
			)
		},
		{
			title: 'Order Status',
			dataIndex: 'status',
			key: 'status',
			width: 150,
			sorter: true,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={ORDER_STATUS_OPTIONS}
					initialValue={orders?.meta.filter?.['status'] as string}
				/>
			)
		},
		{
			title: 'Customer Email',
			dataIndex: 'customerEmail',
			key: 'customerEmail',
			width: 180,
			ellipsis: true,
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type customer email"
					initialValue={orders?.meta.filter?.['customerEmail'] as string}
				/>
			)
		},
		{
			title: 'Customer Mobile',
			dataIndex: 'customerMobile',
			key: 'customerMobile',
			width: 150,
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type customer mobile"
					initialValue={orders?.meta.filter?.['customerMobile'] as string}
				/>
			)
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: 100,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<PriceRange
					{...props}
					initialValue={orders?.meta.filter?.['price'] as string}
				/>
			),
			render: (text, record) => AmountOfThings(record?.price)
		},
		{
			title: 'Total',
			dataIndex: 'total',
			key: 'total',
			width: 100,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<PriceRange
					{...props}
					initialValue={orders?.meta.filter?.['total'] as string}
				/>
			),
			render: (text, record) => (record?.total ? `£${text}` : '-')
		},
		{
			title: 'Amount Collected',
			dataIndex: 'amountCollected',
			key: 'amountCollected',
			width: 160,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					type="number"
					min={0}
					placeholder="Type collected amount, ex: 24.5"
					initialValue={orders?.meta.filter?.['amountCollected'] as string}
				/>
			),
			render: (text, record) => (record?.amountCollected ? `£${text}` : '-')
		},
		{
			title: 'Amount Due',
			dataIndex: 'amountDue',
			key: 'amountDue',
			width: 120,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					type="number"
					min={0}
					placeholder="Type due amount"
					initialValue={orders?.meta.filter?.['amountDue'] as string}
				/>
			)
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 300,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type an address"
					initialValue={orders?.meta.filter?.['address'] as string}
				/>
			)
		},
		{
			title: 'Payment Type',
			dataIndex: 'paymentType',
			key: 'paymentType',
			width: 150,
			sorter: true,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={PAYMENT_TYPE_OPTIONS}
					initialValue={orders?.meta.filter?.['paymentType'] as string}
				/>
			)
		},
		{
			title: 'Order Link',
			dataIndex: 'orderLink',
			key: 'orderLink',
			width: 200,
			ellipsis: true,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type order link"
					type="url"
					initialValue={orders?.meta.filter?.['orderLink'] as string}
				/>
			),
			render: (text, record) =>
				LinkToResource(record?.orderLink as string, text)
		},
		{
			title: 'Drivers',
			dataIndex: 'drivers',
			key: 'drivers',
			width: 100,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type a number of drivers"
					type="number"
					min={1}
					initialValue={orders?.meta.filter?.['drivers'] as string}
				/>
			)
		},
		{
			title: 'Notes for Office',
			dataIndex: 'notes',
			key: 'notes',
			width: 300,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type note"
					min={1}
					initialValue={orders?.meta.filter?.['notes'] as string}
				/>
			),
			render: (_, record) => RenderList(record?.notes)
		},
		{
			title: 'Auction',
			dataIndex: 'auction',
			key: 'auction',
			width: 130,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type auction"
					min={1}
					initialValue={orders?.meta.filter?.['auction'] as string}
				/>
			)
		},
		{
			title: 'Added User',
			dataIndex: 'addedUser',
			key: 'addedUser',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type user's name"
					initialValue={orders?.meta.filter?.['addedUser'] as string}
				/>
			)
		},
		{
			title: 'Added At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={orders?.meta.filter?.['createdAt'] as string}
				/>
			),
			render: (_, record) =>
				momentFormatDateTime(record?.createdAt as string, DATE_TIME_FORMAT)
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Search phone"
					type="number"
					min={1}
					initialValue={orders?.meta.filter?.['phone'] as string}
				/>
			)
		},
		{
			title: 'Trip',
			dataIndex: 'trip',
			key: 'trip',
			width: 300,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type trip"
					initialValue={orders?.meta.filter?.['trip'] as string}
				/>
			),
			render: (_, record) => RenderList(record?.trip)
		},
		{
			title: 'Modified User',
			dataIndex: 'modifiedUser',
			key: 'modifiedUser',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type user's name"
					initialValue={orders?.meta.filter?.['modifiedUser'] as string}
				/>
			)
		},
		{
			title: 'Modified Time',
			dataIndex: 'modifiedAt',
			key: 'modifiedAt',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'modifiedAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={orders?.meta.filter?.['modifiedAt'] as string}
				/>
			),
			render: (_, record) =>
				momentFormatDateTime(record?.modifiedAt as string, DATE_TIME_FORMAT)
		},
		{
			title: 'Payment Reference',
			dataIndex: 'paymentReference',
			key: 'paymentReference',
			width: 180,
			ellipsis: true,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type payment reference"
					initialValue={orders?.meta.filter?.['paymentReference'] as string}
				/>
			)
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			ellipsis: true,
			width: 220,
			sorter: true,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type email"
					initialValue={orders?.meta.filter?.['email'] as string}
				/>
			)
		},
		{
			title: 'Payment Status',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={ORDER_PAYMENT_STATUS_OPTIONS}
					initialValue={orders?.meta.filter?.['paymentStatus'] as string}
				/>
			)
		},
		{
			title: 'Tracking Link',
			dataIndex: 'trackingLink',
			key: 'trackingLink',
			width: 200,
			ellipsis: true,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					type="url"
					placeholder="Type tracking link"
					initialValue={orders?.meta.filter?.['trackingLink'] as string}
				/>
			),
			render: (text, record) =>
				LinkToResource(record.trackingLink as string, text)
		},
		{
			title: 'Loading Fee',
			dataIndex: 'loadingFee',
			key: 'loadingFee',
			width: 120,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<NumberRange
					{...props}
					prefix="£"
					initialValue={orders?.meta.filter?.['loadingFee'] as string}
				/>
			),
			render: (text, record) => AmountOfThings(record?.loadingFee)
		},
		{
			title: 'Discount',
			dataIndex: 'discount',
			key: 'discount',
			width: 120,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<NumberRange
					{...props}
					prefix="£"
					initialValue={orders?.meta.filter?.['discount'] as string}
				/>
			),
			render: (_, record) => AmountOfThings(record?.discount)
		},
		{
			title: 'Start Time',
			dataIndex: 'startTime',
			key: 'startTime',
			width: 150,
			align: 'center',
			sortOrder:
				sortedInfo?.columnKey === 'startTime' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={orders?.meta.filter?.['startTime'] as string}
				/>
			),
			render: (_, record) =>
				momentFormatDateTime(record?.startTime as string, DATE_TIME_FORMAT)
		},
		{
			title: 'Invoiced',
			dataIndex: 'invoiced',
			key: 'invoiced',
			align: 'center',
			width: 100,
			sorter: true,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={ORDER_INVOICED_OPTIONS}
					initialValue={orders?.meta.filter?.['paymentStatus'] as string}
				/>
			),
			render: (text, record) =>
				record?.invoiced ? (
					<Tag color="green">Yes</Tag>
				) : (
					<Tag color="red">No</Tag>
				)
		},
		{
			title: 'Invoice Id',
			dataIndex: 'invoiceId',
			key: 'invoiceId',
			width: 200,
			ellipsis: true,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type invoice ID"
					initialValue={orders?.meta.filter?.['invoiceId'] as string}
				/>
			)
		},
		{
			title: 'Total Paid',
			dataIndex: 'totalPaid',
			key: 'totalPaid',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<PriceRange
					{...props}
					initialValue={orders?.meta.filter?.['totalPaid'] as string}
				/>
			),
			render: (text, record) => AmountOfThings(record?.totalPaid)
		},
		{
			title: 'Added At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={orders?.meta.filter?.['createdAt'] as string}
				/>
			),
			render: (_, record) =>
				momentFormatDateTime(record?.createdAt as string, DATE_TIME_FORMAT)
		},
		{
			title: 'Order Items',
			dataIndex: 'orderItems',
			key: 'orderItems',
			width: 300,
			sorter: true,
			customFilter: (props) => (
				<InputFilter
					{...props}
					placeholder="Type any item(s)"
					initialValue={orders?.meta.filter?.['orderItems'] as string}
				/>
			),
			render: (_, record) => RenderList(record?.orderItems)
		},
		{
			title: 'Total Volume',
			dataIndex: 'totalVolume',
			key: 'totalVolume',
			width: 150,
			align: 'center',
			sorter: true,
			customFilter: (props) => (
				<NumberRange
					{...props}
					initialValue={orders?.meta.filter?.['totalVolume'] as string}
				/>
			),
			render: (_, record) => AmountOfThings(record?.totalVolume, 3, '')
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
			<CustomHead title="All Orders" />
			<CustomPageHeader
				backIcon={false}
				title="All Orders"
				extra={[
					<CustomButton
						key="addButton"
						url="/orders/create"
						icon={<PlusOutlined />}
						btnText="Add"
					/>
				]}
			/>
			<FilterDrawer
				meta={orders?.meta}
				onSearch={(value) => {
					setFilteredInfo((prev) => ({ ...prev, ...value }));
					updateFilters({ filters: value });
					setPaginationInfo((prev) => ({ ...prev, current: 1 }));
					onClose();
				}}
				visible={isDrawerVisible}
				columns={columns}
				onClose={onClose}
				style={{ marginBottom: 50 }}
			/>

			<Container>
				<Table
					{...tableDefaults}
					className="ant-table--fixed-pagination ant-table-small-default"
					size="small"
					columns={columns}
					dataSource={MOCK_ORDERS}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id as string}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize: paginationInfo?.pageSize || orders?.meta.itemsPerPage,
						total: orders?.meta?.totalItems,
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
								placeholder="Search orders"
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

export default AllOrdersPage;
