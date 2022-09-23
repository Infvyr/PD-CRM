import { PlusOutlined } from '@ant-design/icons';
import { DriversKarmaRules } from '@proovia-crm/crm-api-types';
import { Button, Table } from 'antd';
import dynamic from 'next/dynamic';
import {
	Container,
	CustomButton,
	CustomPageHeader,
	SearchForm
} from '../../../../components';
import CustomHead from '../../../../components/Head';
import { CustomColumnsType } from '../../../../components/Table/types';
import { namedComponent } from '../../../../config/dynamic-component';
import { pagination } from '../../../../config/Table/PaginationSettings';
import { tableDefaults } from '../../../../config/Table/TableDefaultProps';
import { useSearch } from '../../../../hooks/useSearch';
import { useTableClear } from '../../../../hooks/useTableClear';
import { useDriversKarmaRules } from '../../../../modules/drivers/karma/hooks/useDriversKarma';
import { StyledAlignment } from '../../../../styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../../components'), 'ResultError')
	)
};

function DriversKarmaRulesPage() {
	const { filteredInfo, sortedInfo, paginationInfo, handleOnChange } =
		useTableClear<DriversKarmaRules>();
	const { search, handleOnSearch } = useSearch();
	const {
		data: karmaRules,
		error,
		loading,
		updateFilters
	} = useDriversKarmaRules({
		search,
		filters: filteredInfo,
		pagination: paginationInfo,
		sorter: sortedInfo
	});

	const columns: CustomColumnsType<DriversKarmaRules> = [
		{
			title: 'Rule',
			dataIndex: 'rule',
			key: 'rule',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'rule' ? sortedInfo.order : undefined,
			render: (_, record) => record?.rule ?? '-'
		},
		{
			title: 'Penalty Points',
			dataIndex: 'points',
			key: 'points',
			width: 150,
			align: 'center',
			sorter: true,
			sortOrder:
				sortedInfo?.columnKey === 'points' ? sortedInfo.order : undefined
		}
	];

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Button type="primary" onClick={() => window.location.reload()}>
						Reload the page
					</Button>
				}
			/>
		);

	return (
		<>
			<CustomHead title="Karma rules" />
			<CustomPageHeader
				backIcon={false}
				title="Karma rules"
				extra={[
					<CustomButton
						key="addButton"
						url="/drivers/karma/rules/create"
						icon={<PlusOutlined />}
					/>
				]}
			/>

			<Container>
				<Table
					{...tableDefaults}
					className="ant-table--fixed-pagination ant-table-small-default"
					size="small"
					columns={columns}
					dataSource={karmaRules?.data}
					onChange={handleOnChange}
					loading={loading}
					rowKey={(record) => record.id}
					pagination={{
						...paginationInfo,
						...pagination,
						defaultPageSize: 20,
						pageSize: paginationInfo?.pageSize || karmaRules?.meta.itemsPerPage,
						total: karmaRules?.meta?.totalItems,
						position: ['bottomRight'],
						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
						onShowSizeChange: (current, size) =>
							updateFilters({
								pagination: { ...paginationInfo, pageSize: size }
							})
					}}
					title={() => (
						<StyledAlignment
							display="inline-flex"
							justifyContent="space-between"
							width="100%"
						>
							<SearchForm onChange={handleOnSearch} placeholder="Search rule" />
						</StyledAlignment>
					)}
				/>
			</Container>
		</>
	);
}

export default DriversKarmaRulesPage;
