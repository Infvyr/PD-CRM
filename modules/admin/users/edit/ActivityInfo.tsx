import { User } from '@proovia-crm/crm-api-types';
import { Card, List, Space, Typography } from 'antd';
import { FC } from 'react';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../config/date-format';

const { Text } = Typography;

type Props = {
	user?: User;
};

export const ActivityInfo: FC<Props> = ({ user }) => {
	const securityInfo = [
		{
			key: 'createdAt',
			label: 'Joined on',
			component: (
				<b>
					{user?.createdAt
						? moment(user.createdAt).format(DATE_TIME_FORMAT)
						: ''}
				</b>
			)
		},
		{
			key: 'updatedAt',
			label: 'Profile last updated on',
			component: (
				<b>
					{user?.updatedAt
						? moment(user.updatedAt).format(DATE_TIME_FORMAT)
						: ''}
				</b>
			)
		},
		{
			key: 'lastLoginAt',
			label: 'Last login on',
			component: (
				<>
					{user?.lastLoginAt ? (
						<b>{moment(user.lastLoginAt).format(DATE_TIME_FORMAT)}</b>
					) : (
						<Text type="secondary">
							<i>Never</i>
						</Text>
					)}
				</>
			)
		}
	];

	return (
		<Card
			title="Activity"
			className="primary"
			bodyStyle={{ padding: '5px 8px' }}
		>
			<List size="small">
				{securityInfo.map(({ key, label, component }) => (
					<List.Item key={key}>
						<Space size="large">
							<div>
								<Text type="secondary">{label}</Text>
								<div>{component}</div>
							</div>
						</Space>
					</List.Item>
				))}
			</List>
		</Card>
	);
};
