import { DriverTask, TaskStatus, TaskType } from '@proovia-crm/crm-api-types';
import { Card, Descriptions, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { EmptyData } from '../../../../../components';
import { DATE_TIME_FORMAT } from '../../../../../config/date-format';
import { namedComponent } from '../../../../../config/dynamic-component';
import { pagination } from '../../../../../config/Table/PaginationSettings';
import DriverActivityContext from '../../../context/DriverActivity.context';
import { useDriverTasks } from '../../../hooks/useDrivers';
import { getTaskImages } from '../../../utils/task-images';
import { StyledList, StyledTaskTable } from '../Overview.styles';

const Dynamic = {
	Images: dynamic(() => namedComponent(import('../Images'), 'Images'), {
		ssr: false
	}),
	ResultError: dynamic(
		() => namedComponent(import('../../../../../components'), 'ResultError'),
		{
			ssr: false
		}
	)
};

export const AllTasks: FC = () => {
	const { id, selectedDate } = useContext(DriverActivityContext);
	const { data: allTasks, error } = useDriverTasks(id, selectedDate);

	const columns: ColumnsType<DriverTask> = [
		{
			title: 'Order ID',
			dataIndex: 'zohoOrderId',
			key: 'orderId',
			fixed: 'left',
			width: 50,
			sorter: (a, b) => a?.zohoOrderId.localeCompare(b?.zohoOrderId),
			render: (text, record) => (record.zohoOrderId ? text : '-')
		},
		{
			title: 'Sequence',
			dataIndex: 'tripSequence',
			key: 'tripSequence',
			width: 42,
			sorter: (a, b) => a?.tripSequence - b?.tripSequence
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 45,
			responsive: ['lg'],
			sorter: (a, b) => a?.status.localeCompare(b?.status),
			render: (text, record) => (
				<>
					{record.status === TaskStatus.COMPLETED && (
						<Tag color="green">{text}</Tag>
					)}
					{record.status === TaskStatus.CONFIRMED && (
						<Tag color="blue">{text}</Tag>
					)}
					{record.status === TaskStatus.SCHEDULED && (
						<Tag color="orange">{text}</Tag>
					)}
					{record.status === TaskStatus.CANCELLED && (
						<Tag color="gray">{text}</Tag>
					)}
					{record.status === TaskStatus.FAILED && <Tag color="red">{text}</Tag>}
					{record.status === TaskStatus.ON_HOLD && (
						<Tag color="gold">{text}</Tag>
					)}
					{record.status === TaskStatus.COMPLETE && (
						<Tag color="green">{text.concat('d')}</Tag>
					)}
				</>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: 40,
			sorter: (a, b) =>
				(a?.type && b?.type) === null ? null! : a?.type.localeCompare(b?.type),
			render: (text, record) => (
				<>
					{record.type === TaskType.DELIVERY && text}
					{record.type === TaskType.COLLECTION && text}
					{record.type === null && '-'}
				</>
			)
		},
		{
			title: 'Items',
			dataIndex: 'items',
			key: 'items',
			width: 250,
			render: (_text, record) => (
				<StyledList>
					{record.items &&
						record.items.split(',').map((item, id) => <li key={id}>{item}</li>)}
				</StyledList>
			)
		},
		{
			title: 'Valid items',
			dataIndex: 'validItems',
			key: 'validItems',
			width: 45,
			sorter: (a, b) => (a === b ? 0 : a ? -1 : 1),
			render: (_text, record) => record.validItems ?? 'No'
		},
		{
			title: 'Payment Type',
			dataIndex: 'paymentType',
			key: 'paymentType',
			width: 60,
			sorter: (a, b) =>
				(a?.paymentType && b?.paymentType) === null
					? null!
					: a?.paymentType.localeCompare(b?.paymentType),
			render: (text, record) => (record.paymentType ? text : '-')
		},
		{
			title: 'Payment Status',
			dataIndex: '',
			key: 'paymentStatus',
			width: 60,
			sorter: (a, b) =>
				a.paymentStatus !== b.paymentStatus
					? a.paymentStatus < b.paymentStatus
						? -1
						: 1
					: 0,
			render: (_text, record) => record.paymentStatus ?? '-'
		},
		{
			title: 'Take Cash',
			dataIndex: 'shouldTakeCash',
			key: 'shouldTakeCash',
			width: 45,
			sorter: (a, b) => (a === b ? 0 : a ? -1 : 1),
			render: (_text, record) => (record.shouldTakeCash ? 'Yes' : 'No')
		},
		{
			title: 'Started At',
			dataIndex: 'startedAt',
			key: 'startedAt',
			width: 60,
			responsive: ['lg'],
			sorter: (a, b) =>
				moment(a?.startedAt)
					.format(DATE_TIME_FORMAT)
					.localeCompare(moment(b?.startedAt).format(DATE_TIME_FORMAT)),
			render: (_text: string, record) =>
				record?.startedAt
					? moment(record?.startedAt).format(DATE_TIME_FORMAT)
					: '-'
		},
		{
			title: 'Completed At',
			dataIndex: 'completedAt',
			key: 'completedAt',
			width: 60,
			responsive: ['lg'],
			sorter: (a, b) =>
				moment(a?.completedAt)
					.format(DATE_TIME_FORMAT)
					.localeCompare(moment(b?.completedAt).format(DATE_TIME_FORMAT)),
			render: (_text: string, record) =>
				record?.completedAt
					? moment(record?.completedAt).format(DATE_TIME_FORMAT)
					: '-'
		}
	];

	if (error) return <Dynamic.ResultError error={error} />;
	if (!allTasks?.data.length)
		return <EmptyData description="No tasks done yet!" />;

	return (
		<>
			<StyledTaskTable>
				<Table<DriverTask>
					bordered
					className="ant-table--fixed-pagination ant-table--bottom-space"
					size="small"
					columns={columns}
					dataSource={allTasks?.data}
					loading={!allTasks}
					rowKey={(record) => record.id}
					pagination={{
						pageSize: 20,
						position: ['bottomRight'],
						...pagination
					}}
					expandable={{
						expandedRowRender: (record) => {
							const itemImages = getTaskImages(record.images)[0];
							const itemInVanImages = getTaskImages(record.images)[1];

							return (
								<Space
									direction="vertical"
									size="middle"
									style={{ width: '100%' }}
								>
									{record.type === TaskType.DELIVERY && (
										<Card>
											<Descriptions
												title="Delivery Details"
												labelStyle={{ fontWeight: 500 }}
											>
												<Descriptions.Item label="Signature at">
													{record?.signatureAt
														? moment(record?.signatureAt).format(
																DATE_TIME_FORMAT
														  )
														: '-'}
												</Descriptions.Item>
												<Descriptions.Item label="Delivery Condition">
													{record.deliveryCondition ?? '-'}
												</Descriptions.Item>
											</Descriptions>
										</Card>
									)}
									<Card>
										<Tabs>
											<Tabs.TabPane tab="Item images" key="item">
												<Dynamic.Images images={itemImages} />
											</Tabs.TabPane>
											<Tabs.TabPane tab="In van images" key="item-in-van">
												<Dynamic.Images images={itemInVanImages} />
											</Tabs.TabPane>
										</Tabs>
									</Card>
								</Space>
							);
						},
						rowExpandable: (record) => record.vanId !== '',
						expandRowByClick: true,
						showExpandColumn: false
					}}
				/>
			</StyledTaskTable>
		</>
	);
};
