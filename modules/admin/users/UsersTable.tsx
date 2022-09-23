import { User } from '@proovia-crm/crm-api-types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Text from 'antd/lib/typography/Text';
import React, { FC } from 'react';
import { tableDefaults } from '../../../config/Table/TableDefaultProps';
import { useUsers } from './hooks/useUsers';
import { useTableClear } from '../../../hooks/useTableClear';
import { pagination } from '../../../config/Table/PaginationSettings';
import { UserStatusSwitch } from './UserStatusSwitch';
import moment from 'moment';
import { SearchForm } from '../../../components';
import { DATE_FORMAT } from '../../../config/date-format';
import { useSearch } from '../../../hooks/useSearch';
import { useRolesFilterConfig as useRoleFilterConfig } from './hooks/useRoleFilterConfig';
import { useProfileFilterConfig } from './hooks/useProfileFilterConfig';
import { USER_STATUS_PROFILE_CONFIG } from './constants/userStatusProfileConfig';

type Props = {
	onNameClick?: (user: User) => void;
};

export const UsersTable: FC<Props> = ({ onNameClick }) => {
	const { paginationInfo, handleOnChange, sortedInfo, filteredInfo } =
		useTableClear<User>({
			pageSize: 20
		});
	const { search, handleOnSearch } = useSearch();

	const { data: users, loading } = useUsers({
		search,
		sorter: sortedInfo,
		filters: filteredInfo,
		pagination: paginationInfo
	});
	const rolesFilterConfig = useRoleFilterConfig();
	const profilesFilterConfig = useProfileFilterConfig();

	const columns: ColumnsType<User> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			render: (value, record) => (
				<a onClick={() => onNameClick?.(record)}>{value}</a>
			)
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 100
		},
		{
			title: 'Role',
			dataIndex: ['role', 'name'],
			key: 'role',
			width: 100,
			filterSearch: true,
			filters: rolesFilterConfig
		},
		{
			title: 'Profile',
			dataIndex: ['profile', 'name'],
			key: 'profile',
			width: 100,
			filterSearch: true,
			filters: profilesFilterConfig
		},
		{
			title: 'Last login',
			dataIndex: 'lastLoginAt',
			key: 'lastLoginAt',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'lastLoginAt' ? sortedInfo.order : undefined,
			render: (value) =>
				value ? (
					moment(value).fromNow()
				) : (
					<Text type="secondary">
						<i>Never</i>
					</Text>
				)
		},
		{
			title: 'User Status',
			dataIndex: 'isActive',
			key: 'isActive',
			width: 100,
			filterSearch: true,
			filters: USER_STATUS_PROFILE_CONFIG,
			render: (value, record) => <UserStatusSwitch user={record} />
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 100,
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'createdAt' ? sortedInfo.order : undefined,
			render: (value) => moment(value).format(DATE_FORMAT)
		}
	];

	return (
		<>
			<Table<User>
				{...tableDefaults}
				className="ant-table--fixed-pagination"
				size="small"
				scroll={{ x: 1200 }}
				columns={columns}
				dataSource={users?.data}
				rowKey={(record) => record.id}
				onChange={handleOnChange}
				loading={loading}
				pagination={{
					pageSize: paginationInfo?.pageSize,
					total: users?.meta?.totalItems,
					position: ['bottomRight'],
					...pagination
				}}
				title={() => <SearchForm onChange={handleOnSearch} />}
			/>
		</>
	);
};
