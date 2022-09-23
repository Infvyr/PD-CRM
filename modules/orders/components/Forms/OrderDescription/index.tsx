import { Form, Input } from 'antd';
import { FC } from 'react';

export const OrderDescription: FC = (): JSX.Element => {
	return (
		<Form.Item label="Order description" name="orderDescription">
			<Input.TextArea
				autoSize={{ minRows: 2, maxRows: 6 }}
				placeholder="Order description"
			/>
		</Form.Item>
	);
};
