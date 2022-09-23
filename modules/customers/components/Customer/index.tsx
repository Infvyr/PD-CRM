import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Select } from 'antd';
import { FC } from 'react';
import { useDrawer } from '../../../../hooks/useDrawer';
import { EmptyData } from '../../../../components';
import { CustomerFormWidget } from '../../widgets/CustomerForm/CustomerFormWidget';

export const Customer: FC = (): JSX.Element => {
	const { showDrawer, isDrawerVisible, onClose } = useDrawer();

	const options = [
		{ label: 'Customer 1', value: 'customer 1' },
		{ label: 'Customer 2', value: 'customer 2' },
		{ label: 'Customer 3', value: 'customer 3' }
	];

	return (
		<>
			<Form.Item label="Customer" name="customer">
				<Select
					showSearch
					allowClear
					dropdownRender={(menu) => (
						<>
							{menu}
							<div style={{ height: '5px' }} />
							<Button
								block
								type="primary"
								icon={<PlusOutlined />}
								onClick={showDrawer}
							>
								Add new customer
							</Button>
						</>
					)}
					notFoundContent={<EmptyData description={`No customer found!`} />}
					optionFilterProp="children"
					options={options}
					placeholder="Type or select a customer"
				>
					<Select.Option value="11">Option 1</Select.Option>
					<Select.Option value="22">Option 2</Select.Option>
					<Select.Option value="33">Option 3</Select.Option>
				</Select>
			</Form.Item>

			<Drawer
				title="New Customer"
				width="30vw"
				placement="right"
				onClose={onClose}
				visible={isDrawerVisible}
			>
				<CustomerFormWidget />
			</Drawer>
		</>
	);
};
