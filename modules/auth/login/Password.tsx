import { FC } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { rules } from '../../../config/Forms/rules';

export const Password: FC = (): JSX.Element => {
	return (
		<Form.Item name="password" rules={[rules.password[0]]}>
			<Input.Password
				prefix={<LockOutlined />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
	);
};
