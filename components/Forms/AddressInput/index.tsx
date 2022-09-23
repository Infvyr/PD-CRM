import { Form, Input } from 'antd';
import { FC } from 'react';
import { rules } from '../../../config/Forms/rules';

type Props = {
	label?: string;
	placeholder?: string;
};

export const AddressInput: FC<Props> = ({
	label = 'Address',
	placeholder = 'Enter an address'
}): JSX.Element => {
	return (
		<Form.Item label={label} name="address" rules={rules.address}>
			<Input placeholder={placeholder} />
		</Form.Item>
	);
};
