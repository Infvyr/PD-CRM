import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { Address } from '@proovia-crm/crm-api-types';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { StyledAlignment } from 'apps/crm-app/styles';
import { isNil, omitBy } from 'lodash';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import { AddressesApi } from '../../api/addresses.api';
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
import { useAddresses } from '../../modules/addresses/hooks/useAddress';
import { showError } from '../../utils/message.helper';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

function AddressesPage() {
	const addressApi = new AddressesApi();
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<Address>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();

	const {
		data: address,
		loading,
		error,
		updateFilters,
		mutate
	} = useAddresses({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(address?.meta.filter || {}).length,
		[filteredInfo, address?.meta.filter]
	);

	const deleteAddress = (id: number) => async () => {
		if (!id) {
			showError('No address found!');
			return;
		}

		if (id) {
			try {
				await addressApi.deleteAddress(id);
				message.success(`The address has been successfully deleted!`);
			} catch (error) {
				showError(error);
			} finally {
				await mutate();
			}
		}
	};

	const columns: CustomColumnsType<Address> = [
		{
			title: 'Contact Name',
			dataIndex: 'contactName',
			key: 'contactName',
			width: 150,
			fixed: 'left',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'contactName' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type contact name"
					initialValue={address?.meta.filter?.['contactName'] as string}
				/>
			)
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 150,
			ellipsis: true,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'email' ? sortedInfo.order : undefined
		},
		{
			title: 'Address',
			dataIndex: 'addressString',
			key: 'addressString',
			width: 250,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'addressString' ? sortedInfo.order : undefined
		},
		{
			title: 'House name/number',
			dataIndex: 'houseName',
			key: 'houseName',
			width: 180,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'houseName' ? sortedInfo.order : undefined
		},
		{
			title: 'Line 1',
			dataIndex: 'line1',
			key: 'line1',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'line1' ? sortedInfo.order : undefined
		},
		{
			title: 'Line 2',
			dataIndex: 'line2',
			key: 'line2',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'line2' ? sortedInfo.order : undefined
		},
		{
			title: 'Line 3',
			dataIndex: 'line3',
			key: 'line3',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'line3' ? sortedInfo.order : undefined
		},
		{
			title: 'Line 4',
			dataIndex: 'line4',
			key: 'line4',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'line4' ? sortedInfo.order : undefined
		},
		{
			title: 'Line 5',
			dataIndex: 'line5',
			key: 'line5',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'line5' ? sortedInfo.order : undefined
		},
		{
			title: 'Postcode',
			dataIndex: 'postcode',
			key: 'postcode',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'postcode' ? sortedInfo.order : undefined
		},
		{
			title: 'Customer',
			dataIndex: 'customer',
			key: 'customer',
			width: 200,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'customer' ? sortedInfo.order : undefined
		},
		{
			title: 'Mobile',
			dataIndex: 'mobile',
			key: 'mobile',
			width: 140,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'mobile' ? sortedInfo.order : undefined
		},
		{
			title: 'Town',
			dataIndex: 'postTown',
			key: 'postTown',
			width: 120,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'postTown' ? sortedInfo.order : undefined
		},
		{
			title: 'Which days',
			dataIndex: 'whichDays',
			key: 'whichDays',
			width: 120,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'whichDays' ? sortedInfo.order : undefined
		},
		{
			title: 'Working Hours',
			dataIndex: 'workingHours',
			key: 'workingHours',
			width: 150,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'workingHours' ? sortedInfo.order : undefined
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 150,
			align: 'center',
			render: (_, record) => {
				return (
					<Space>
						<Link href={`/customers/edit/address/${record?.id}`} passHref>
							<Button icon={<EditOutlined />} />
						</Link>
						<Link href={`/customers/view/${record?.id}`} passHref>
							<Button icon={<EyeOutlined />} disabled />
						</Link>
						<Popconfirm
							title={`Are you sure to delete this address?`}
							onConfirm={deleteAddress(record?.id)}
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
			<CustomHead title="Addresses" />
			<CustomPageHeader
				backIcon={false}
				title="Addresses"
				extra={[
					<CustomButton
						key="addButton"
						url="/customers/create/address"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={address?.meta}
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
					dataSource={address?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize: paginationInfo?.pageSize || address?.meta.itemsPerPage,
						total: address?.meta?.totalItems,
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
								placeholder="Search address"
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

export default AddressesPage;
