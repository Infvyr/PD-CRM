import { FC } from 'react';
import { Checkbox, Form } from 'antd';

export const RememberMe: FC = (): JSX.Element => {
	return (
		<Form.Item name="remember" valuePropName="checked" noStyle>
			<Checkbox>Remember me</Checkbox>
		</Form.Item>
	);
};
