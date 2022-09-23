import { actions } from '@proovia-crm/crm-api-types';
import { Form, Select } from 'antd';
import { FC, ComponentPropsWithRef } from 'react';

const { Option } = Select;

type Props = {
	selectProps?: ComponentPropsWithRef<typeof Select>;
} & ComponentPropsWithRef<typeof Form.Item>;

const ActionSelect: FC<Props> = ({ selectProps, ...formItemProps }) => {
	return (
		<Form.Item
			label="Action"
			name="action"
			rules={[{ required: true, message: 'Please select an action' }]}
			{...formItemProps}
		>
			<Select {...selectProps}>
				{actions.map((action) => (
					<Option key={action} value={action}>
						{action}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default ActionSelect;
