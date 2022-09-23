import { Form, Radio } from 'antd';
import { FC } from 'react';
import { rules } from '../../../../config/Forms/rules';

export const PaymentType: FC = (): JSX.Element => {
	return (
		<Form.Item
			label="Payment type"
			name="paymentType"
			rules={rules.paymentType}
		>
			<Radio.Group>
				<Radio value="Upfront">Upfront</Radio>
				<Radio value="Invoice">Invoice</Radio>
			</Radio.Group>
		</Form.Item>
	);
};
