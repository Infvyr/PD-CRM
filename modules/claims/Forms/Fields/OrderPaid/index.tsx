import { FC } from 'react';
import { Checkbox, Form } from 'antd';

export const OrderPaid: FC = (): JSX.Element => {
	return (
		<Form.Item valuePropName="checked" name="orderPaid">
			<Checkbox>Order paid</Checkbox>
		</Form.Item>
	);
};
