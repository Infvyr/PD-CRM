import { Profile } from '@proovia-crm/crm-api-types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { pagination } from '../../../config/Table/PaginationSettings';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchForm, ResultError } from '../../../components';
import { DATE_TIME_FORMAT } from '../../../config/date-format';
import { tableDefaults } from '../../../config/Table/TableDefaultProps';
import { useSearch } from '../../../hooks/useSearch';
import { useTableClear } from '../../../hooks/useTableClear';
import { useProfiles } from './hooks/useProfiles';

export function ProfilesTable() {
	const { handleOnChange, paginationInfo, sortedInfo } =
		useTableClear<Profile>();
	const { search, handleOnSearch } = useSearch();
	const router = useRouter();

	const {
		data: profiles,
		error,
		loading
	} = useProfiles({
		search,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const path = router.asPath;

	if (error) return <ResultError />;

	const columns: ColumnsType<Profile> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			render: (value, record) => (
				<Link href={`${path}/${record.id}`}>{value}</Link>
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
			<Table
				{...tableDefaults}
				size="small"
				columns={columns}
				className="ant-table--fixed-pagination"
				dataSource={profiles?.data}
				rowKey={(record) => record.id}
				onChange={handleOnChange}
				loading={loading}
				pagination={{
					pageSize: paginationInfo?.pageSize,
					total: profiles?.meta?.totalItems,
					position: ['bottomRight'],
					...pagination
				}}
				title={() => <SearchForm onChange={handleOnSearch} />}
			/>
		</>
	);
}

export default ProfilesTable;
