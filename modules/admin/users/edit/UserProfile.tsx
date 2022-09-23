import { Avatar, Image, Space, Tag, Typography } from 'antd';
import { FC } from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { User } from '@proovia-crm/crm-api-types';

const { Title, Paragraph, Text } = Typography;

type Props = {
	user?: User;
};

export const UserProfile: FC<Props> = ({ user }) => {
	return (
		<Space size="large">
			<Avatar
				size={100}
				src={
					<Image
						src="https://joeschmoe.io/api/v1/male/jack"
						style={{ width: 100 }}
						alt="User profile avatar"
					/>
				}
			/>
			<div>
				<Title level={4} style={{ marginBottom: 0 }}>
					<Space>
						<span>{user?.name}</span>
						<Tag color="red-inverse">
							{user?.profile?.name ? user.profile.name : 'No profile'}
						</Tag>
					</Space>
				</Title>
				<Paragraph>
					{user?.role?.name ? `${user.role?.name}` : 'No role'} at Proovia
				</Paragraph>

				<Space direction="vertical" size="small">
					<Space>
						<Text type="secondary">
							<MailOutlined type="secondary" />
						</Text>
						<Text copyable>{user?.email}</Text>
					</Space>
					<Space>
						<Text type="secondary">
							<PhoneOutlined />
						</Text>
						<Text copyable>{user?.mobile || user?.phone}</Text>
					</Space>
				</Space>
			</div>
		</Space>
	);
};
