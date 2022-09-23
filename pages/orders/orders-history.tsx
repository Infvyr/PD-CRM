import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { OrderApi } from '../../api/orders.api';
import {
	Container,
	CustomButton,
	CustomPageHeader,
	FilterButton,
	SearchForm
} from '../../components';
import CustomHead from '../../components/Head';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import {
	scrollDefaults,
	tableDefaults
} from '../../config/Table/TableDefaultProps';
import { useTablePagination } from '../../hooks/useTablePagination';
import { StyledAlignment } from '../../styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

const orderApi = new OrderApi();

function OrdersHistory({
	orders
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { pageSize, handlePageChange } = useTablePagination();

	const columns: ColumnsType<any> = [
		{
			title: 'Order ID',
			dataIndex: 'id',
			key: 'order',
			fixed: 'left',
			width: 90,
			align: 'center'
		},
		{
			title: 'Added Date',
			dataIndex: 'addedDate',
			key: 'addedDate',
			render: () =>
				new Date(
					+new Date() - Math.floor(Math.random() * 10000000000)
				).toLocaleString('en-GB'),
			width: 130
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (value, record) => record?.username,
			width: 100
		},
		{
			title: 'Items',
			dataIndex: 'name',
			key: 'items',
			render: (value, record) => record?.company?.catchPhrase
		},
		{
			title: 'Total',
			dataIndex: 'total',
			key: 'total',
			render: (value, record) => record?.address?.geo?.lat.replace('-', ''),
			width: 90,
			align: 'center'
		},
		{
			title: 'Tracking number',
			dataIndex: 'trackNumber',
			key: 'trackNumber',
			render: (value, record) => record?.address?.city,
			width: 150,
			align: 'center'
		},
		{
			title: 'Payment status',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus',
			render: (value, record) => record?.username,
			width: 140,
			align: 'center'
		},
		{
			title: 'Package Details',
			dataIndex: 'details',
			key: 'details',
			render: (value, record) => record?.email,
			width: 150
		}
	];

	if (!orders.length) return <Dynamic.ResultError />;

	return (
		<>
			<CustomHead title="Orders history" />
			<CustomPageHeader
				backIcon={false}
				title="Orders history"
				extra={[
					<CustomButton
						key="addButton"
						url="/orders/create"
						icon={<PlusOutlined />}
						btnText="Add"
					/>
				]}
			/>

			<Container>
				<Table<any>
					className="ant-table--fixed-pagination"
					{...tableDefaults}
					scroll={scrollDefaults}
					size="small"
					columns={columns}
					dataSource={orders}
					rowKey={(record) => record.id}
					pagination={{
						pageSize,
						onChange: handlePageChange,
						position: ['bottomRight'],
						...pagination
					}}
					title={() => (
						<StyledAlignment
							display="inline-flex"
							justifyContent="space-between"
							width="100%"
						>
							<SearchForm />
							<FilterButton text="Filters" />
						</StyledAlignment>
					)}
				/>
			</Container>
		</>
	);
}

export default OrdersHistory;

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await orderApi.getOrdersHistory();
	const orders: any = await response.data;

	return {
		props: {
			orders
		}
	};
};
