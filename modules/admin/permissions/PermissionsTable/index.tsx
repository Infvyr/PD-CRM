import { Permission } from '@proovia-crm/crm-api-types';
import { Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchForm, ResultError } from '../../../../components';
import { DATE_TIME_FORMAT } from '../../../../config/date-format';
import { pagination } from '../../../../config/Table/PaginationSettings';
import { tableDefaults } from '../../../../config/Table/TableDefaultProps';
import { useSearch } from '../../../../hooks/useSearch';
import { useTableClear } from '../../../../hooks/useTableClear';
import { usePermissions } from '../hooks/usePermissions';

export function PermissionsTable() {
	const { handleOnChange, paginationInfo, sortedInfo } =
		useTableClear<Permission>();
	const { search, handleOnSearch } = useSearch();
	const router = useRouter();

	const {
		data: permissions,
		error,
		loading
	} = usePermissions({
		search,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	if (error) return <ResultError />;

	const columns: ColumnsType<Permission> = [
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
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			width: 100
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: 100
		},
		{
			title: 'Inverted',
			dataIndex: 'inverted',
			key: 'inverted',
			width: 100,
			render: (value) => <Switch checked={value} />
		},
		{
			title: 'Reason',
			dataIndex: 'reason',
			key: 'reason',
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
			<Table
				{...tableDefaults}
				size="small"
				columns={columns}
				className="ant-table--fixed-pagination"
				dataSource={permissions?.data}
				rowKey={(record) => record.id}
				onChange={handleOnChange}
				loading={loading}
				pagination={{
					pageSize: paginationInfo?.pageSize,
					total: permissions?.meta?.totalItems,
					position: ['bottomRight'],
					...pagination
				}}
				title={() => <SearchForm onChange={handleOnSearch} />}
			/>
		</>
	);
}

export default PermissionsTable;
