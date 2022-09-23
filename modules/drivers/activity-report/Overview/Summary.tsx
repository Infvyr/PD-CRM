import { Descriptions, Divider, Tag } from 'antd';
import moment from 'moment';
import { FC, useContext } from 'react';
import { EmptyData, ResultError } from '../../../../components';
import { DATE_TIME_FORMAT } from '../../../../config/date-format';
import DriverActivityContext from '../../context/DriverActivity.context';
import { useDriver } from '../../hooks/useDrivers';

const { Item } = Descriptions;

export const Summary: FC = (): JSX.Element => {
	const { id } = useContext(DriverActivityContext);
	const { data: driver, error } = useDriver(id);

	if (error) return <ResultError error={error} />;

	return (
		<Descriptions
			column={3}
			title={<Divider orientation="left">Driver Info</Divider>}
			labelStyle={{ fontWeight: 'bold' }}
		>
			{!driver && <EmptyData description="No driver info yet!" />}

			{driver && (
				<>
					<Item label="Name">{driver?.name}</Item>
					<Item label="Email">
						<a
							href={`mailto: ${driver?.email}`}
							title={`Mail ${driver?.name}`}
							target="_blank"
							rel="noreferrer"
						>
							<u>{driver?.email}</u>
						</a>
					</Item>
					<Item label="Mobile">
						{driver.mobile ? <u>{driver?.mobile}</u> : 'No mobile number yet!'}
					</Item>
					{driver?.licenseNumber && (
						<Item label="License">{driver.licenseNumber}</Item>
					)}
					{driver?.licenseExpiredAt && (
						<Item label="License Expires">{driver.licenseExpiredAt}</Item>
					)}

					<Item label="Status">
						{driver?.isActive ? (
							<Tag color="green">Active</Tag>
						) : (
							<Tag color="red">Inactive</Tag>
						)}
					</Item>
					<Item label="Last login">
						{driver?.lastLogin ? (
							moment(driver.lastLogin).format(DATE_TIME_FORMAT)
						) : (
							<Tag color="red">Not logged yet!</Tag>
						)}
					</Item>
				</>
			)}
		</Descriptions>
	);
};
