import { DatePicker, Form } from 'antd';
import { FC } from 'react';
import { DATE_PICKER_FORMAT } from '../../../config/date-format';

export const DriverKarmaDatePicker: FC = (): JSX.Element => (
	<Form.Item
		name="committedOn"
		label="Date"
		rules={[{ required: true }]}
		style={{ marginBottom: 0 }}
	>
		<DatePicker
			format={DATE_PICKER_FORMAT}
			placeholder="Select date"
			style={{ width: '100%' }}
		/>
	</Form.Item>
);
