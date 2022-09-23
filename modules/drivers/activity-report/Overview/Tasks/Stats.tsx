import { Card, Col, Row, Statistic } from 'antd';
import { FC, useContext } from 'react';
import { Spinner } from '../../../../../components';
import DriverActivityContext from '../../../context/DriverActivity.context';
import { useDriverTasks } from '../../../hooks/useDrivers';
import { countTaskTypeStatus } from '../../../utils/task-status';

export const Stats: FC = () => {
	const { id, selectedDate } = useContext(DriverActivityContext);
	const { data, loading, error } = useDriverTasks(id, selectedDate);

	const totalTasks = data?.meta.totalItems ?? '-';
	const completedTasks =
		data?.data !== undefined ? countTaskTypeStatus(data?.data)[0] : '-';
	const failedTasks =
		data?.data !== undefined ? countTaskTypeStatus(data?.data!)[1] : '-';
	const deliveryTasks =
		data?.data !== undefined ? countTaskTypeStatus(data?.data!)[2] : '-';
	const collectionTasks =
		data?.data !== undefined ? countTaskTypeStatus(data?.data!)[3] : '-';

	if (loading) return <Spinner />;
	if (error || !data?.data.length) return null;

	return (
		<Card>
			<Row gutter={[24, 24]}>
				<Col xs={24} sm={12} lg={8}>
					<Statistic title="Total" value={totalTasks} />
				</Col>
				<Col xs={24} sm={12} lg={8}>
					<Statistic title="Completed" value={completedTasks} />
				</Col>
				<Col xs={24} sm={12} lg={8}>
					<Statistic title="Failed" value={failedTasks} />
				</Col>
				<Col xs={24} sm={12} lg={8}>
					<Statistic title="Delivery" value={deliveryTasks} />
				</Col>
				<Col xs={24} sm={12} lg={8}>
					<Statistic title="Collection" value={collectionTasks} />
				</Col>
			</Row>
		</Card>
	);
};
