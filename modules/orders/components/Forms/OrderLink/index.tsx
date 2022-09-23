import { Form, Input } from 'antd';
import { FC } from 'react';

export const OrderLink: FC = (): JSX.Element => {
	return (
		<Form.Item label="Order link" name="orderLink" rules={[{ type: 'url' }]}>
			<Input type="url" placeholder="Paste or type in here the link of order" />
		</Form.Item>
	);
};
