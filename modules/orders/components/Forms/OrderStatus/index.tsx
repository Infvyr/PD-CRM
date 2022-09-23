import { FC } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export const OrderStatus: FC = (): JSX.Element => {
	return (
		<Form.Item name="status" label="Status">
			<Select allowClear placeholder="Order status" optionFilterProp="children">
				<Option value="agreed">Agreed with customer</Option>
				<Option value="not-agreed">No communication</Option>
			</Select>
		</Form.Item>
	);
};
