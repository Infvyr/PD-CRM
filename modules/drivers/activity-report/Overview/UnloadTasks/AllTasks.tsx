import { DriverTask } from '@proovia-crm/crm-api-types';
import { Card, Table, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { EmptyData } from '../../../../../components';
import { namedComponent } from '../../../../../config/dynamic-component';
import { scrollDefaults } from '../../../../../config/Table/TableDefaultProps';
import DriverActivityContext from '../../../context/DriverActivity.context';
import { useDriverUnloadTasks } from '../../../hooks/useDrivers';
import { getTaskImages } from '../../../utils/task-images';
import { COLUMNS } from '../../common/unload-tasks-columns';
import { StyledTaskTable } from '../Overview.styles';

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
	const { data: unloadTasks, error } = useDriverUnloadTasks(id, selectedDate);

	if (error) return <Dynamic.ResultError error={error} />;
	if (!unloadTasks?.data.length)
		return <EmptyData description="No unload tasks done yet!" />;

	return (
		<>
			<StyledTaskTable>
				<Table<DriverTask>
					bordered
					className="ant-table--fixed-pagination"
					size="small"
					scroll={scrollDefaults}
					columns={COLUMNS}
					dataSource={unloadTasks?.data}
					loading={!unloadTasks}
					rowKey={(record) => record.id}
					pagination={false}
					expandable={{
						expandedRowRender: (record) => {
							const warehouseImages = getTaskImages(record.images)[4];

							return (
								<Card>
									<Tabs>
										<Tabs.TabPane
											tab="Warehouse images"
											key="item-in-warehouse"
										>
											<Dynamic.Images images={warehouseImages} />
										</Tabs.TabPane>
									</Tabs>
								</Card>
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
