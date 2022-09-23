import { PlusOutlined } from '@ant-design/icons';
import {
	WAREHOUSE_LOCATIONS_OPTIONS,
	WarehouseLocation,
	WarehouseLocationFull
} from '@proovia-crm/crm-api-types';
import { Button, Image, message, Table, Tag } from 'antd';
import { StyledAlignment } from 'apps/crm-app/styles';
import { isNil, omitBy, startCase } from 'lodash';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { WarehouseApi } from '../../api/warehouse.api';
import {
	CheckboxFilter,
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
import { fallbackImage } from '../../config/ant-image';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import { tableDefaults } from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useMatchMutate } from '../../hooks/useMatchMutate';
import { useSearch } from '../../hooks/useSearch';
import { useTableClear } from '../../hooks/useTableClear';
import { AssignOrderForm } from '../../modules/warehouse/components';
import { useWarehousesLocations } from '../../modules/warehouse/hooks/useWarehouse';
import { showError } from '../../utils/message.helper';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

const MOCK_DATA: WarehouseLocation[] = [
	{
		id: 1,
		bin: 'A01',
		currentOrder: 248244,
		lastOrder: 247104,
		orderDescription: '2x King-size beds flat packed',
		warehouse: 'Birmingham',
		full: WarehouseLocationFull.FULL,
		location: 'A01 - Birmingham',
		qrCode:
			'https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		id: 2,
		bin: 'A02',
		currentOrder: 247230,
		lastOrder: 246113,
		orderDescription:
			'Contemporary Solid Pine Low Bed Frame - To Fit King Size Mattress',
		warehouse: 'Birmingham',
		full: WarehouseLocationFull.EMPTY,
		location: 'A02 - Birmingham',
		qrCode:
			'https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	}
];

function WarehousesLocationsPage() {
	const warehouseApi = new WarehouseApi();
	const [visible, setVisible] = useState<boolean>(false);
	const [order, setOrder] = useState<number>();
	const matchMutate = useMatchMutate();
	const { search, handleOnSearch } = useSearch();
	const {
		filteredInfo,
		setFilteredInfo,
		setPaginationInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		clearAll
	} = useTableClear<WarehouseLocation>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();

	const {
		data: locations,
		loading,
		error,
		updateFilters
	} = useWarehousesLocations({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const filterCount = useMemo(
		() =>
			Object.keys(omitBy(filteredInfo, isNil)).length ||
			Object.keys(locations?.meta.filter || {}).length,
		[filteredInfo, locations?.meta.filter]
	);

	const showModal = (order?: number) => () => {
		setVisible(!visible);
		setOrder(order);
	};
	const hideModal = () => setVisible(false);

	const onCreate = async (values: {
		currentOrder: number;
		warehouse: string;
	}) => {
		const currentOrderId = +values.currentOrder;
		const warehouseLocation = values.warehouse;

		const newValues = {
			currentOrder: currentOrderId,
			warehouse: warehouseLocation
		};

		console.log('Received values of form: ', currentOrderId, warehouseLocation);

		try {
			// await warehouseApi.updateOrderLocation(currentOrderId, newValues);
			message.success('Order successfully assigned!');
			// await matchMutate(/^\/api\/v1\/warehouses-locations/);
			hideModal();
		} catch (error) {
			showError(error);
			showModal();
		}
	};

	const columns: CustomColumnsType<WarehouseLocation> = [
		{
			title: 'Bin',
			dataIndex: 'bin',
			key: 'bin',
			width: 35,
			align: 'center',
			sorter: true,
			sortOrder: sortedInfo?.columnKey === 'bin' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type warehouse location bin"
					initialValue={locations?.meta.filter?.['bin'] as string}
				/>
			)
		},
		{
			title: 'Current Order',
			dataIndex: 'currentOrder',
			key: 'currentOrder',
			width: 65,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'currentOrder' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type current order"
					initialValue={locations?.meta.filter?.['currentOrder'] as string}
				/>
			)
		},
		{
			title: 'Last Order',
			dataIndex: 'lastOrder',
			key: 'lastOrder',
			width: 55,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'lastOrder' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type last order"
					initialValue={locations?.meta.filter?.['lastOrder'] as string}
				/>
			)
		},
		{
			title: 'Order Description',
			dataIndex: 'orderDescription',
			key: 'orderDescription',
			width: 250,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'orderDescription'
					? sortedInfo.order
					: undefined
		},
		{
			title: 'Warehouse',
			dataIndex: 'warehouse',
			key: 'warehouse',
			width: 80,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'warehouse' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type warehouse name"
					initialValue={locations?.meta.filter?.['warehouse'] as string}
				/>
			)
		},
		{
			title: 'Full',
			dataIndex: 'full',
			key: 'full',
			width: 40,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'full' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<CheckboxFilter
					{...props}
					options={WAREHOUSE_LOCATIONS_OPTIONS}
					initialValue={locations?.meta.filter?.['full'] as string}
				/>
			),
			render: (text, record) =>
				record.full === WarehouseLocationFull.FULL ? (
					<Tag color="success">{startCase(text)}</Tag>
				) : (
					<Tag color="error">{startCase(text)}</Tag>
				)
		},
		{
			title: 'Location Name',
			dataIndex: 'location',
			key: 'location',
			width: 100,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'location' ? sortedInfo.order : undefined,
			customFilter: (props) => (
				<SelectFilter
					{...props}
					placeholder="Type location name"
					initialValue={locations?.meta.filter?.['location'] as string}
				/>
			)
		},
		{
			title: 'QR Code',
			dataIndex: 'qrCode',
			key: 'qrCode',
			align: 'center',
			width: 60,
			render: (_, record) => (
				<Image
					width={100}
					height={100}
					src={record?.qrCode}
					fallback={fallbackImage}
				/>
			)
		},
		{
			title: 'Assign Order',
			key: 'assignOrder',
			align: 'center',
			width: 50,
			render: (_, { currentOrder }) => (
				<Button onClick={showModal(currentOrder)}>Assign</Button>
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
			<CustomHead title="Warehouse Locations" />
			<CustomPageHeader
				backIcon={false}
				title="Warehouse Locations"
				extra={[
					<CustomButton
						key="addButton"
						url="/warehouses/locations"
						icon={<PlusOutlined />}
					/>
				]}
			/>
			<FilterDrawer
				meta={locations?.meta}
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
						pageSize: paginationInfo?.pageSize || locations?.meta.itemsPerPage,
						total: locations?.meta?.totalItems,
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
								placeholder="Search warehouse location"
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

			<AssignOrderForm
				currentOrder={order as number}
				visible={visible}
				onCreate={onCreate}
				onCancel={hideModal}
			/>
		</>
	);
}

export default WarehousesLocationsPage;
