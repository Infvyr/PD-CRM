import { FileProtectOutlined, TeamOutlined } from '@ant-design/icons';
import { User } from '@proovia-crm/crm-api-types';
import { Card, List, Space, Typography } from 'antd';
import { FC } from 'react';
import { StyledProfileSelect, StyledRoleSelect } from './SecurityInfo.styles';

const { Text } = Typography;

type Props = {
	user?: User;
};

export const SecurityInfo: FC<Props> = ({ user }) => {
	const securityInfo = [
		{
			key: 'role',
			label: 'Role',
			component: (
				<StyledRoleSelect
					name="role"
					selectProps={{ bordered: false }}
					rules={[]}
				/>
			),
			icon: TeamOutlined
		},
		{
			key: 'profile',
			label: 'Profile',
			component: (
				<StyledProfileSelect
					name="profile"
					rules={[]}
					selectProps={{ bordered: false }}
				/>
			),
			icon: FileProtectOutlined
		}
	];

	return (
		<Card
			title="Security info"
			className="primary"
			bodyStyle={{ padding: '5px 8px' }}
		>
			<List size="small">
				{securityInfo.map(({ key, label, component, icon: Icon }) => (
					<List.Item key={key}>
						<Space size="large">
							<Text type="secondary">
								<Icon style={{ fontSize: '20px' }} />
							</Text>
							<div style={{ minWidth: '300px' }}>
								<Text>
									<b>{label}</b>
								</Text>
								<div>{component}</div>
							</div>
						</Space>
					</List.Item>
				))}
			</List>
		</Card>
	);
};
