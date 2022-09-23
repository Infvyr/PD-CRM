import { Driver } from '@proovia-crm/crm-api-types';
import { Button, Table } from 'antd';
import { isNil, omitBy } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import {
	Container,
	CustomPageHeader,
	FilterButton,
	SearchForm,
	SelectFilter
} from '../../components';
import CustomHead from '../../components/Head';
import FilterDrawer from '../../components/Table/FilterDrawer';
import { CustomColumnsType } from '../../components/Table/types';
import { namedComponent } from '../../config/dynamic-component';
import { pagination } from '../../config/Table/PaginationSettings';
import { tableDefaults } from '../../config/Table/TableDefaultProps';
import { useDrawer } from '../../hooks/useDrawer';
import { useTableClear } from '../../hooks/useTableClear';
import { useDriversActivity } from '../../modules/drivers/hooks/useDrivers';
import { StyledAlignment } from '../../styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../components'), 'ResultError')
	)
};

function ActivityReport() {
	const [search, setSearch] = useState<string>();
	const { isDrawerVisible, showDrawer, onClose } = useDrawer();
	const router = useRouter();
	const {
		clearAll,
		filteredInfo,
		sortedInfo,
		paginationInfo,
		handleOnChange,
		setFilteredInfo,
		setPaginationInfo
	} = useTableClear<Driver>({ pageSize: 20 });
	const { data: drivers, error } = useDriversActivity({
		search,
		pagination: paginationInfo,
		sorter: sortedInfo,
		filters: filteredInfo
	});

	const handleOnSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const filterCount = useMemo(
		() => Object.keys(omitBy(filteredInfo, isNil)).length,
		[filteredInfo]
	);

	const columns: CustomColumnsType<Driver> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sortOrder:
				sortedInfo?.columnKey === 'name' ? sortedInfo.order : undefined,
			sorter: true,
			customFilter: (props) => (
				<SelectFilter {...props} placeholder="Type driver's name" />
			)
		}
	];

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Button type="primary" onClick={() => router.reload()}>
						Reload page
					</Button>
				}
			/>
		);

	return (
		<>
			<CustomHead title="Drivers activity report" />
			<CustomPageHeader backIcon={false} title="Drivers Activity Report" />
			<FilterDrawer
				onSearch={(value) => {
					setFilteredInfo((prev) => ({ ...prev, ...value }));
					setPaginationInfo((prev) => ({ ...prev, current: 1 }));
					onClose();
				}}
				visible={isDrawerVisible}
				columns={columns}
				onClose={onClose}
			/>
			<Container>
				<Table<Driver>
					{...tableDefaults}
					size="small"
					className="ant-table--clickable ant-table--fixed-pagination"
					columns={columns}
					dataSource={drivers?.data}
					loading={!drivers?.data}
					onChange={handleOnChange}
					onRow={(record) => {
						return {
							onClick: () => router.push(`/drivers/${record.id}`)
						};
					}}
					pagination={{
						position: ['bottomRight'],
						pageSize: paginationInfo?.pageSize,
						total: drivers?.meta?.totalItems,
						...pagination
					}}
					title={() => (
						<StyledAlignment
							display="inline-flex"
							justifyContent="space-between"
							width="100%"
						>
							<SearchForm
								onChange={handleOnSearch}
								placeholder="Search driver"
							/>
							<StyledAlignment
								display="inline-flex"
								justifyContent="flex-end"
								gap="1rem"
							>
								{Boolean(filterCount) && (
									<Button onClick={clearAll}>Clear filters</Button>
								)}
								<FilterButton
									text="Filters"
									filterCount={filterCount}
									onClick={showDrawer}
								/>
							</StyledAlignment>
						</StyledAlignment>
					)}
					rowKey={(record) => record.id}
				/>
			</Container>
		</>
	);
}

export default ActivityReport;
