import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { Customer } from '@proovia-crm/crm-api-types';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { StyledAlignment } from 'apps/crm-app/styles';
import { isNil, omitBy } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import { CustomersApi } from '../../api/customers.api';
import {
	CheckboxFilter,
	Container,
	CustomButton,
	CustomPageHeader,
	DateRangeFilter,
	FilterButton,
	SearchForm,
	SearchInput,
	SelectFilter
} from '../../components';
import CustomHead from '../../components/Head';
import FilterDrawer from '../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../components/Table/types';
import { DATE_TIME_FORMAT } from '../../config/date-format';
import { namedComponent } from '../../config/dynamic-component';
import { addedTimeOptions } from '../../config/Filter/time-options';
import { pagination } from '../../config/Table/PaginationSettings';
import { tableDefaults } from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useSearch } from '../../hooks/useSearch';
import { useTableClear } from '../../hooks/useTableClear';
import { useCustomers } from '../../modules/customers/hooks/useCustomer';
import { showError } from '../../utils/message.helper';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

/**
 * PAYMENT_TYPE_OPTIONS - payment type options for CUSTOMER entity
 * Should be modified as soon as customer paymentType key is changed to ENUM
 * */
const PAYMENT_TYPE_OPTIONS = [
	{
		label: 'Upfront',
		value: 'Upfront'
	},
	{
		label: 'Invoice',
		value: 'Invoice'
	}
];

function CustomersPage() {
	const customerApi = new CustomersApi();
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<Customer>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();

	const {
		data: customers,
		loading,
		error,
		updateFilters,
		mutate
	} = useCustomers({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(customers?.meta.filter || {}).length,
		[filteredInfo, customers?.meta.filter]
	);

	const deleteCustomer = (id: number, name: string) => async () => {
		if (!id) {
			showError('No customer found!');
			return;
		}

		if (id) {
			try {
				await customerApi.deleteCustomer(id);
				message.success(`The customer ${name} has been successfully deleted!`);
			} catch (error) {
				showError(error);
			} finally {
				await mutate();
			}
		}
	};

	const columns: CustomColumnsType<Customer> = [
		{
			title: 'Zoho ID',
			dataIndex: 'zohoId',
			key: 'zohoId',
			width: 100,
			fixed: 'left',
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'zohoId' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type zoho ID"
					initialValue={customers?.meta.filter?.['zohoId'] as string}
				/>
			),
			responsive: ['lg']
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 130,
			fixed: 'left',
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type customer name"
					initialValue={customers?.meta.filter?.['name'] as string}
				/>
			)
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 130,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'email' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type customer email"
					initialValue={customers?.meta.filter?.['name'] as string}
				/>
			),
			render: (text, record) => (
				<a href={`mailto:${record?.email}`} title={record?.email}>
					{text}
				</a>
			)
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 130,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'phone' ? sortedInfo.order : undefined,
			render: (text, record) =>
				record?.phone ? (
					<a href={`tel:${record?.phone}`} title={record?.phone}>
						{text}
					</a>
				) : (
					'-'
				)
		},
		{
			title: 'Mobile',
			dataIndex: 'mobile',
			key: 'mobile',
			width: 110,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'mobile' ? sortedInfo.order : undefined,
			render: (text, record) =>
				record?.mobile ? (
					<a href={`tel:${record?.mobile}`} title={record?.mobile}>
						{text}
					</a>
				) : (
					'-'
				)
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 360,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'address' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SearchInput
					{...props}
					placeholder="Type address"
					initialValue={customers?.meta.filter?.['address'] as string}
				/>
			)
		},
		{
			title: 'Payment Type',
			dataIndex: 'paymentType',
			key: 'paymentType',
			width: 150,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'paymentType' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={PAYMENT_TYPE_OPTIONS}
					initialValue={customers?.meta.filter?.['paymentType'] as string}
				/>
			)
		},
		/**
		 * Payment Terms column is missing in the endpoint keys atm
		 * */
		/*{
			title: 'Payment Terms',
			dataIndex: 'paymentTerms',
			key: 'paymentTerms',
			width: 200,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'paymentTerms' ? sortedInfo.order : undefined
		},*/
		/**
		 * Modified Time must be returned in /api/v1/customers
		 * */
		{
			title: 'Modified Time',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			width: 150,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'updatedAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={customers?.meta.filter?.['updatedAt'] as string}
				/>
			),
			render: (_, record) =>
				record?.updatedAt
					? moment(record?.updatedAt).format(DATE_TIME_FORMAT)
					: '-'
		},
		{
			title: 'Added Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdAt' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<DateRangeFilter
					{...props}
					options={addedTimeOptions}
					initialValue={customers?.meta.filter?.['createdAt'] as string}
				/>
			),
			render: (_, record) => moment(record?.createdAt).format(DATE_TIME_FORMAT)
		},
		/**
		 * Modified User must be returned in /api/v1/customers
		 * */
		{
			title: 'Modified User',
			dataIndex: ['modifiedByUser', 'name'],
			key: 'modifiedByUser',
			width: 150,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'modifiedByUser'
					? sortedInfo.order
					: undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type user's name"
					initialValue={
						customers?.meta.filter?.['modifiedByUser.name'] as string
					}
				/>
			)
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 150,
			align: 'center',
			render: (_, record) => {
				return (
					<Space>
						<Link href={`/customers/edit/customer/${record?.id}`} passHref>
							<Button icon={<EditOutlined />} />
						</Link>
						<Link href={`/customers/view/${record?.id}`} passHref>
							<Button icon={<EyeOutlined />} disabled />
						</Link>
						<Popconfirm
							title={`Are you sure to delete ${record?.name}`}
							onConfirm={deleteCustomer(record?.id, record?.name as string)}
							okText="Yes"
							cancelText="No"
							placement="left"
						>
							<Button
								data-id={record.id}
								type="primary"
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Space>
				);
			}
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
			<CustomHead title="Customers" />
			<CustomPageHeader
				backIcon={false}
				title="Customers"
				extra={[
					<CustomButton
						key="addButton"
						url="/customers/create/customer"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={customers?.meta}
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
					dataSource={customers?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize: paginationInfo?.pageSize || customers?.meta.itemsPerPage,
						total: customers?.meta?.totalItems,
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
								placeholder="Search customers"
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

export default CustomersPage;
