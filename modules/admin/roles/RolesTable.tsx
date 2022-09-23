import { Role } from '@proovia-crm/crm-api-types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchForm, ResultError } from '../../../components';
import { DATE_TIME_FORMAT } from '../../../config/date-format';
import { pagination } from '../../../config/Table/PaginationSettings';
import { tableDefaults } from '../../../config/Table/TableDefaultProps';
import { useSearch } from '../../../hooks/useSearch';
import { useTableClear } from '../../../hooks/useTableClear';
import { useRoles } from './hooks/useRoles';

export function RolesTable() {
	const { handleOnChange, paginationInfo, sortedInfo } = useTableClear<Role>();
	const { search, handleOnSearch } = useSearch();
	const router = useRouter();

	const {
		data: roles,
		error,
		loading
	} = useRoles({ search, pagination: paginationInfo, sorter: sortedInfo });

	if (error) return <ResultError />;

	const columns: ColumnsType<Role> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			render: (value, record) => (
				<Link href={`${router.asPath}/${record.id}`}>
					<a>{value}</a>
				</Link>
			)
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: 100
		},
		{
			title: 'Users',
			dataIndex: 'users',
			key: 'users',
			width: 100
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 100,
			render: (value) => moment(value).format(DATE_TIME_FORMAT)
		},
		{
			title: 'Updated at',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			width: 100,
			render: (value) => moment(value).format(DATE_TIME_FORMAT)
		}
	];

	return (
		<>
			<Table<Role>
				{...tableDefaults}
				size="small"
				columns={columns}
				className="ant-table--fixed-pagination"
				dataSource={roles?.data}
				rowKey={(record) => record.id}
				onChange={handleOnChange}
				loading={loading}
				pagination={{
					pageSize: paginationInfo?.pageSize,
					total: roles?.meta?.totalItems,
					position: ['bottomRight'],
					...pagination
				}}
				title={() => <SearchForm onChange={handleOnSearch} />}
			/>
		</>
	);
}

export default RolesTable;
