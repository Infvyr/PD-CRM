import { Form, Input } from 'antd';
import { FC } from 'react';

export const OrderDimensions: FC = (): JSX.Element => {
	return (
		<Form.Item label="Dimensions" name="dimensions">
			<Input.TextArea
				autoSize={{ minRows: 2, maxRows: 6 }}
				placeholder="Dimensions"
			/>
		</Form.Item>
	);
};
