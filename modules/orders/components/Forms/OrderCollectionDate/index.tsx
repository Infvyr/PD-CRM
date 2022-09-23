import { DatePicker, Form } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { rules } from '../../../../../config/Forms/rules';
import { DATE_PICKER_FORMAT } from '../../../../../config/date-format';

export const OrderCollectionDate: FC = (): JSX.Element => {
	const disabledDate = (currentDate: moment.Moment) =>
		currentDate && currentDate < moment().endOf('day');

	return (
		<Form.Item
			name="collectionDate"
			label="Collection Date"
			rules={rules.dateCollection}
		>
			<DatePicker
				format={DATE_PICKER_FORMAT}
				disabledDate={disabledDate}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	);
};
