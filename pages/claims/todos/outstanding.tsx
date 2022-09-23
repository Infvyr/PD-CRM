import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ClaimTodo } from '@proovia-crm/crm-api-types';
import { Button, Dropdown, Menu, message, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isNull } from 'lodash';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ClaimsApi } from '../../../api/claims.api';
import { Container, CustomButton } from '../../../components';
import CustomHead from '../../../components/Head';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../config/date-format';
import { namedComponent } from '../../../config/dynamic-component';
import { pagination } from '../../../config/Table/PaginationSettings';
import {
	scrollDefaults,
	tableDefaults
} from '../../../config/Table/TableDefaultProps';
import { useTablePagination } from '../../../hooks/useTablePagination';
import { useClaimsOutstandingTodos } from '../../../modules/claimsTodos/hooks/useClaimsTodos';
import { useMatchMutate } from '../../../hooks/useMatchMutate';
import { showError } from '../../../utils/message.helper';

const Dynamic = {
	CustomPageHeader: dynamic(() =>
		namedComponent(import('../../../components/'), 'CustomPageHeader')
	),
	ResultError: dynamic(() =>
		namedComponent(import('../../../components/'), 'ResultError')
	),
	Edit: dynamic(() =>
		namedComponent(
			import('../../../modules/claimsTodos/components/QuickActions/Edit'),
			'Edit'
		)
	),
	Show: dynamic(() =>
		namedComponent(
			import('../../../modules/claimsTodos/components/QuickActions/Show'),
			'Show'
		)
	)
};

const claimsApi = new ClaimsApi();

function OutstandingTodos() {
	const matchMutate = useMatchMutate();
	const { pageIndex, pageSize, handlePageChange } = useTablePagination();
	const { data, error } = useClaimsOutstandingTodos(pageIndex, pageSize);
	const todos = data?.data || [];
	const total = data?.meta?.totalItems;
	const current = data?.meta.currentPage;

	const handleConfirm = (id: number) => async () => {
		try {
			await claimsApi.updateClaimTodoStatus(id);
			message.success('Claim todo successfully completed!');
			matchMutate(/^\/api\/v1\/claim-todos/);
		} catch (error) {
			showError(error);
		}
	};

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
										<Dynamic.Show record={record} />
									</div>
								)
							},
							{
								key: 'actionEdit',
								label: (
									<div style={{ margin: '-5px -12px' }}>
										<Dynamic.Edit data={todos} record={record} />
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
							onClick={(e) => e.preventDefault()}
							icon={<EllipsisOutlined />}
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
							? ''
							: moment(record?.dueDate).format(DATE_FORMAT)}
					</>
				);
			}
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
			width: 160,
			render: (text: string, record) => {
				return (
					<>
						{isNull(record.createdAt)
							? ''
							: moment(record?.createdAt).format(DATE_TIME_FORMAT)}
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
			title: 'Action',
			dataIndex: 'completed',
			key: 'completed',
			width: 140,
			align: 'center',
			render: (_text: string, record) => {
				return (
					<Popconfirm
						title="Sure to complete?"
						onConfirm={handleConfirm(record.id)}
						placement="leftBottom"
					>
						<Button size="small">Mark as done</Button>
					</Popconfirm>
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
			<CustomHead title="Outstanding todos" />
			<Dynamic.CustomPageHeader
				backIcon={false}
				title="Outstanding ToDos"
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
		</>
	);
}

export default OutstandingTodos;
