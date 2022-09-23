import { Role } from '@proovia-crm/crm-api-types';
import { List, Space, Typography } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import EditableInput from '../../../../components/Forms/EditableInput/index';
import { DATE_TIME_FORMAT } from '../../../../config/date-format';

const { Text } = Typography;

type Props = {
	role?: Role;
};

export const RoleInfo: FC<Props> = ({ role }) => {
	const roleInfo = [
		{
			key: 'name',
			label: 'Role name',
			component: <EditableInput name="name" />
		},
		{
			key: 'description',
			label: 'Role description',
			component: <EditableInput name="description" />
		},
		{
			key: 'parentRole',
			label: 'Parent role',
			component: role?.parent?.name
		},
		{
			key: 'createdAt',
			label: 'Created at',
			component: role?.createdAt ? (
				moment(role?.createdAt).format(DATE_TIME_FORMAT)
			) : (
				<i>unknown</i>
			)
		}
	];
	return (
		<List size="small">
			{roleInfo.map(({ key, label, component }) => (
				<List.Item key={key}>
					<Text type="secondary">
						<Space size="large">
							<div>
								<Text>
									<b>{label}</b>
								</Text>
								<div>{component}</div>
							</div>
						</Space>
					</Text>
				</List.Item>
			))}
		</List>
	);
};
