import { FC, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import {
	AutoComplete,
	Button,
	Card,
	Col,
	ConfigProvider,
	Divider,
	Form,
	InputNumber,
	Popconfirm,
	Row,
	Table
} from 'antd';
import CreateOrderContext from '../../../../../context/CreateOrder.context';
import { ColumnsType } from 'antd/lib/table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EmptyData } from '../../../../../components';
import { StyledTableWrapper, StyledHeader } from './OrderItems.styles';

export const OrderItems: FC = (): JSX.Element => {
	const { form } = useContext(CreateOrderContext);
	const orderItems: any[] = Object.values(
		form?.getFieldValue('orderItems') || []
	);

	const [data, setData] = useState<any[]>(() =>
		orderItems.map((order) => ({ ...order, key: nanoid() }))
	);

	const items = [
		{ value: 'Item 1', label: 'Item 1' },
		{ value: 'Item 2', label: 'Item 2' },
		{ value: 'Item 3', label: 'Item 3' }
	];

	const handleOnAddOrderItem = () => {
		setData((prevData) => [...prevData, { key: nanoid(), order: '' }]);
	};

	const handleOnDelete = (record: any) => {
		const newData = data.filter((element) => element.key !== record.key);
		setData(newData);
	};

	const handleOnDeleteAll = () => setData([]);

	const columns: ColumnsType<any> = [
		{
			key: 'index',
			width: 32,
			align: 'center',
			className: 'table-cell-delete',
			render: (value, record) => (
				<>
					<Popconfirm
						title="Delete?"
						onConfirm={() => handleOnDelete(record)}
						okText="Yes"
						cancelText="No"
						placement="topLeft"
					>
						<Button icon={<DeleteOutlined />} />
					</Popconfirm>
				</>
			)
		},
		{
			title: 'Item',
			dataIndex: 'orderNumber',
			key: 'orderNumber',
			width: 200,
			render: (value, record) => (
				<>
					<Form.Item
						name={['orderItems', record.key, 'item']}
						style={{ marginBottom: 0 }}
					>
						<AutoComplete
							allowClear
							options={items}
							placeholder="Type and select an item"
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							notFoundContent={<EmptyData description="No item found!" />}
							showSearch
						/>
					</Form.Item>
				</>
			)
		},
		{
			title: 'Quantity',
			dataIndex: 'qty',
			key: 'qty',
			width: 60,
			render: (value, record) => (
				<>
					<Form.Item
						name={['orderItems', record.key, 'qty']}
						style={{ marginBottom: 0 }}
					>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
				</>
			)
		},
		{
			title: 'Volume',
			dataIndex: 'volume',
			key: 'volume',
			width: 60,
			render: (value, record) => (
				<>
					<Form.Item
						name={['orderItems', record.key, 'volume']}
						style={{ marginBottom: 0 }}
					>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
				</>
			)
		}
	];

	return (
		<Col xs={24} lg={12}>
			<Card style={{ marginTop: '24px' }} bodyStyle={{ paddingTop: 0 }}>
				<Row>
					<Col span={24}>
						<Divider orientation="left">Order Items</Divider>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={24}>
						<StyledHeader>
							<label>Items</label>
							{data.length >= 2 && (
								<Popconfirm
									title="Sure?"
									onConfirm={handleOnDeleteAll}
									okText="Yes"
									cancelText="No"
								>
									<Button type="primary" size="small" icon={<DeleteOutlined />}>
										Delete all
									</Button>
								</Popconfirm>
							)}
						</StyledHeader>
						<Form.Item name="orderItems">
							<ConfigProvider renderEmpty={() => null}>
								<StyledTableWrapper>
									<Table
										columns={columns}
										dataSource={data}
										pagination={false}
										rowKey={(record) => record.key}
										footer={() => (
											<Button
												type="dashed"
												onClick={handleOnAddOrderItem}
												icon={<PlusOutlined />}
												block
											>
												Add New
											</Button>
										)}
									/>
								</StyledTableWrapper>
							</ConfigProvider>
						</Form.Item>
					</Col>
				</Row>
			</Card>
		</Col>
	);
};
