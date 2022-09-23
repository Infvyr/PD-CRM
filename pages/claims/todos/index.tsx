import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ClaimTodo } from '@proovia-crm/crm-api-types';
import { Button, Dropdown, Menu, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isNull } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Container, CustomButton, CustomPageHeader } from '../../../components';
import CustomHead from '../../../components/Head';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../config/date-format';
import { namedComponent } from '../../../config/dynamic-component';
import { pagination } from '../../../config/Table/PaginationSettings';
import {
	scrollDefaults,
	tableDefaults
} from '../../../config/Table/TableDefaultProps';
import { useTablePagination } from '../../../hooks/useTablePagination';
import { Show } from '../../../modules/claimsTodos/components/QuickActions/Show';
import { useClaimsTodos } from '../../../modules/claimsTodos/hooks/useClaimsTodos';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../components'), 'ResultError')
	)
};

function ClaimTodos() {
	const { pageIndex, pageSize, handlePageChange } = useTablePagination();
	const { data, error } = useClaimsTodos(pageIndex, pageSize);
	const todos = data?.data;
	const total = data?.meta?.totalItems;
	const current = data?.meta.currentPage;

	const columns: ColumnsType<ClaimTodo> = [
		{
			title: '#',
			key: 'actions',
			width: 50,
			fixed: 'left',
			align: 'center',
			className: 'table-cell-actions',
			render: (record) => {
				const menu = (
					<Menu
						items={[
							{
								key: 'actionShow',
								label: (
									<div style={{ margin: '-5px -12px' }}>
										<Show record={record} />
									</div>
								)
							}
						]}
					/>
				);

				return (
					<Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
						<Button
							type="link"
							icon={<EllipsisOutlined />}
							onClick={(e) => e.preventDefault()}
							style={{ width: '100%' }}
						/>
					</Dropdown>
				);
			}
		},
		{
			title: 'Order',
			dataIndex: 'order',
			key: 'order',
			fixed: 'left',
			width: 115,
			sorter: (a, b) => a.order - b.order
		},
		{
			title: 'Task',
			dataIndex: 'task',
			key: 'task',
			sorter: (a, b) => a.task.localeCompare(b.task)
		},
		{
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate',
			width: 120,
			sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
			render: (text: string, record) => {
				return (
					<>
						{isNull(record.dueDate)
							? '-'
							: moment(record.dueDate).format(DATE_FORMAT)}
					</>
				);
			}
		},
		{
			title: 'Created By',
			dataIndex: 'createdBy',
			key: 'createdBy',
			width: 130,
			sorter: (a, b) => a.createdBy.localeCompare(b.createdBy)
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
			width: 120,
			render: (text: string, record) => {
				return (
					<>
						{isNull(record.createdAt)
							? '-'
							: moment(record.createdAt).format(DATE_FORMAT)}
					</>
				);
			}
		},
		{
			title: 'Completed By',
			dataIndex: 'completedBy',
			key: 'completedBy',
			width: 130
		},
		{
			title: 'Completed At',
			dataIndex: 'completedAt',
			key: 'completedAt',
			sorter: (a, b) =>
				moment(a?.completedAt)
					.format(DATE_TIME_FORMAT)
					.localeCompare(moment(b?.completedAt).format(DATE_TIME_FORMAT)),
			width: 160,
			render: (text: string, record) => {
				return (
					<>
						{isNull(record.completedAt)
							? '-'
							: moment(record.completedAt).format(DATE_TIME_FORMAT)}
					</>
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
					<Link href="/claims/todos/outstanding" passHref>
						<Button type="primary">Back to Outstanding ToDos</Button>
					</Link>
				}
			/>
		);

	return (
		<>
			<CustomHead title="All todos" />
			<CustomPageHeader
				backIcon={false}
				title="All ToDos"
				extra={[
					<CustomButton
						key="addTodo"
						url="/claims/todos/create"
						icon={<PlusOutlined />}
					/>
				]}
			/>

			<Container>
				<Table<ClaimTodo>
					{...tableDefaults}
					className="ant-table--fixed-pagination"
					scroll={scrollDefaults}
					size="small"
					columns={columns}
					dataSource={todos}
					rowKey={(record) => record.id}
					loading={!todos}
					pagination={{
						pageSize,
						total,
						current,
						onChange: handlePageChange,
						position: ['bottomRight'],
						...pagination
					}}
				/>
			</Container>

			<br />
		</>
	);
}

export default ClaimTodos;
