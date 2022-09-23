import { FC } from 'react';
import { Form } from 'antd';
import { ForgotPassword } from './ForgotPassword';

export const QuickActions: FC = (): JSX.Element => {
	return (
		<Form.Item>
			<ForgotPassword />
		</Form.Item>
	);
};
