import {
	GiftOutlined,
	MailOutlined,
	MobileOutlined,
	PhoneOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Card, DatePicker, List, Space, Typography } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FC } from 'react';
import EditableInput from '../../../../components/Forms/EditableInput';
import { rules } from '../../../../config/Forms/rules';

const { Text } = Typography;

export const UserInfo: FC = () => {
	const userInfo = [
		{
			key: 'name',
			label: 'Full name',
			component: <EditableInput name="name" rules={rules['name']} />,
			icon: UserOutlined
		},
		{
			key: 'email',
			label: 'Email',
			component: (
				<EditableInput
					name="email"
					inputProps={{ type: 'email' }}
					rules={rules['email']}
				/>
			),
			icon: MailOutlined
		},
		{
			key: 'phone',
			label: 'Phone',
			component: (
				<EditableInput
					name="phone"
					placeholder="Phone number"
					inputProps={{ type: 'tel' }}
					rules={rules['phone']}
				/>
			),
			icon: PhoneOutlined
		},
		{
			key: 'mobile',
			label: 'Mobile',
			component: (
				<EditableInput
					name="mobile"
					placeholder="Mobile number"
					inputProps={{ type: 'tel' }}
					rules={rules['phone']}
				/>
			),
			icon: MobileOutlined
		},
		{
			key: 'birthDate',
			label: 'Date of birth',
			component: (
				<FormItem name="birthDate">
					<DatePicker
						bordered={false}
						inputReadOnly
						style={{ paddingLeft: 0 }}
					/>
				</FormItem>
			),
			icon: GiftOutlined
		}
	];

	return (
		<Card
			title="Basic info"
			className="primary"
			bodyStyle={{ padding: '5px 8px' }}
		>
			<List size="small">
				{userInfo.map(({ key, label, component, icon: Icon }) => (
					<List.Item key={key}>
						<Text type="secondary">
							<Space size="large">
								<Icon style={{ fontSize: '20px' }} />
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
