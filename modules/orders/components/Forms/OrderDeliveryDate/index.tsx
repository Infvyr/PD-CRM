import { DatePicker, Form } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { rules } from '../../../../../config/Forms/rules';
import { DATE_PICKER_FORMAT } from '../../../../../config/date-format';

export const OrderDeliveryDate: FC = (): JSX.Element => {
	const disabledDate = (currentDate: moment.Moment) =>
		currentDate && currentDate < moment().startOf('day');

	return (
		<Form.Item
			name="deliveryDate"
			label="Delivery Date"
			rules={rules.dateDelivery}
		>
			<DatePicker
				format={DATE_PICKER_FORMAT}
				disabledDate={disabledDate}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	);
};
