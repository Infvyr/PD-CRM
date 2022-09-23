import { DatePicker, Form } from 'antd';
import { FC } from 'react';
import { rules } from '../../../../config/Forms/rules';
import { DATE_PICKER_FORMAT } from '../../../../config/date-format';

export const ApproveDate: FC = (): JSX.Element => {
	return (
		<Form.Item label="Date T&C Approved" name="dateTC" rules={rules.dateTC}>
			<DatePicker
				allowClear
				format={DATE_PICKER_FORMAT}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	);
};
