import { FC } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { rules } from '../../../config/Forms/rules';

type Props = {
	userRef?: null | undefined;
};

export const Username: FC<Props> = ({ userRef }: Props): JSX.Element => {
	return (
		<Form.Item name="email" rules={rules.email}>
			<Input
				type="email"
				prefix={<UserOutlined />}
				placeholder="Email"
				ref={userRef}
			/>
		</Form.Item>
	);
};
