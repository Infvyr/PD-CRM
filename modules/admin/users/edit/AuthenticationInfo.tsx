import { User } from '@proovia-crm/crm-api-types';
import { Card, List, Space, Typography } from 'antd';
import { FC } from 'react';
import { LockOutlined, HddOutlined } from '@ant-design/icons';
import EditablePasswordInput from '../../../../components/Forms/EditableInput/EditablePasswordInput';
import { rules } from '../../../../config/Forms/rules';

const { Text } = Typography;

type Props = {
	user?: User;
};

export const AuthenticationInfo: FC<Props> = ({ user }) => {
	const securityInfo = [
		{
			key: 'provider',
			label: 'Provider',
			component: <>Local</>,
			icon: HddOutlined
		},
		{
			key: 'password',
			label: 'Password',
			component: (
				<EditablePasswordInput
					name="password"
					tooltip="Change password"
					rules={rules.password.filter(
						(rule) => typeof rule !== 'object' || !rule.required
					)}
				/>
			),
			icon: LockOutlined
		}
	];

	return (
		<Card
			title="Authentication"
			className="primary"
			bodyStyle={{ padding: '5px 8px' }}
		>
			<List size="small">
				{securityInfo.map(({ key, label, component, icon: Icon }) => (
					<List.Item key={key}>
						<Text type="secondary">
							<Space size="large" className="ant-space-align-start">
								<Icon style={{ fontSize: '20px', marginTop: '6px' }} />
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
		</Card>
	);
};
