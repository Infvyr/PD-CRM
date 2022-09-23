import { DriverTask, TaskStatus } from '@proovia-crm/crm-api-types';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../config/date-format';
import { StyledList } from '../Overview/Overview.styles';

export const COLUMNS: ColumnsType<DriverTask> = [
	{
		title: 'Order ID',
		dataIndex: 'zohoOrderId',
		key: 'orderId',
		width: 50,
		sorter: (a, b) => a?.zohoOrderId.localeCompare(b?.zohoOrderId)
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: 50,
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
				{record.status === TaskStatus.ON_HOLD && <Tag color="gold">{text}</Tag>}
				{record.status === TaskStatus.COMPLETE && (
					<Tag color="green">{text.concat('d')}</Tag>
				)}
			</>
		)
	},
	{
		title: 'Sequence',
		dataIndex: 'tripSequence',
		key: 'tripSequence',
		width: 50,
		sorter: (a, b) => a?.tripSequence - b?.tripSequence
	},
	{
		title: 'Load location',
		dataIndex: 'itemLocation',
		key: 'itemLocation',
		width: 100,
		render: (text, record) =>
			record.itemLocations.length > 0
				? record.itemLocations.map((item) => <Tag>{item.shortName}</Tag>)
				: '-'
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
		title: 'Started At',
		dataIndex: 'startedAt',
		key: 'startedAt',
		width: 70,
		sorter: (a, b) =>
			moment(a?.startedAt)
				.format(DATE_TIME_FORMAT)
				.localeCompare(moment(b?.startedAt).format(DATE_TIME_FORMAT)),
		render: (text: string, record) =>
			record?.startedAt
				? moment(record?.startedAt).format(DATE_TIME_FORMAT)
				: '-'
	},
	{
		title: 'Completed At',
		dataIndex: 'completedAt',
		key: 'completedAt',
		width: 70,
		sorter: (a, b) =>
			moment(a?.completedAt)
				.format(DATE_TIME_FORMAT)
				.localeCompare(moment(b?.completedAt).format(DATE_TIME_FORMAT)),
		render: (text: string, record) =>
			record?.startedAt
				? moment(record?.completedAt).format(DATE_TIME_FORMAT)
				: '-'
	}
];
