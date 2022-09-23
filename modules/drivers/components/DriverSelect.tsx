import { Form, Select, Spin } from 'antd';
import { FC } from 'react';
import { useDrivers } from '../hooks/useDrivers';

const { Option } = Select;

export const DriverSelect: FC = (): JSX.Element => {
	const { data: drivers } = useDrivers();

	return (
		<Form.Item
			name="driverId"
			label="Driver"
			rules={[{ required: true }]}
			style={{ marginBottom: 0 }}
		>
			<Select
				showSearch
				loading={!drivers}
				placeholder="Select driver"
				optionFilterProp="children"
				notFoundContent={!drivers ? <Spin size="small" /> : null}
				style={{ width: '100%' }}
			>
				{drivers?.data.map((driver) => (
					<Option key={driver.id} value={driver.id}>
						{driver.name}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};
