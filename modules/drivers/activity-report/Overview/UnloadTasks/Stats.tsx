import { TaskStatus } from '@proovia-crm/crm-api-types';
import { Card, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import { FC, useContext } from 'react';
import { Spinner } from '../../../../../components';
import { TIME_FORMAT } from '../../../../../config/date-format';
import DriverActivityContext from '../../../context/DriverActivity.context';
import {
	useDriverCompletedUnloadTasks,
	useDriverUnloadTasks
} from '../../../hooks/useDrivers';

export const Stats: FC = () => {
	const { id, selectedDate } = useContext(DriverActivityContext);
	const { data, loading, error } = useDriverUnloadTasks(id, selectedDate);
	const { data: completedUnloads } = useDriverCompletedUnloadTasks(
		id,
		selectedDate
	);
	const totalTasks = data?.meta.totalItems ?? '-';
	const completedTasks =
		data?.data.filter((task) => task.status === TaskStatus.COMPLETED).length ??
		'-';

	if (loading) return <Spinner />;
	if (error || !data?.data.length) return null;

	return (
		<Card>
			<Row gutter={[24, 24]}>
				<Col xs={24} sm={12} lg={6}>
					<Statistic title="Total" value={totalTasks} />
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Statistic title="Completed" value={completedTasks} />
				</Col>
				<>
					<Col xs={24} sm={12} lg={6}>
						<Statistic
							title="Started At"
							value={
								completedUnloads?.data[0]?.startActionAt
									? moment(completedUnloads?.data[0]?.startActionAt).format(
											TIME_FORMAT
									  )
									: '-'
							}
						/>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Statistic
							title="Completed At"
							value={
								completedUnloads?.data[0]?.endActionAt
									? moment(completedUnloads?.data[0]?.endActionAt).format(
											TIME_FORMAT
									  )
									: '-'
							}
						/>
					</Col>
				</>
			</Row>
		</Card>
	);
};
