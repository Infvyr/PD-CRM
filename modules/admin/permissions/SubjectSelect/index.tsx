import { subjects } from '@proovia-crm/crm-api-types';
import { Form, Select } from 'antd';
import { FC, ComponentPropsWithRef } from 'react';

const { Option } = Select;

type Props = {
	selectProps?: ComponentPropsWithRef<typeof Select>;
} & ComponentPropsWithRef<typeof Form.Item>;

const selectOptions = subjects.filter((subject) => subject !== 'all').sort();

const SubjectSelect: FC<Props> = ({ selectProps, ...formItemProps }) => {
	return (
		<Form.Item
			label="Subject"
			name="subject"
			rules={[{ required: true, message: 'Please select a subject' }]}
			{...formItemProps}
		>
			<Select showSearch {...selectProps}>
				{selectOptions.map((action) => (
					<Option key={action} value={action}>
						{action}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default SubjectSelect;
