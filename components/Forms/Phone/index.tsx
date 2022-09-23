import { Form, Input } from 'antd';
import { FC } from 'react';

type Props = {
	placeholder?: string;
};

export const Phone: FC<Props> = ({
	placeholder = 'Phone number'
}): JSX.Element => {
	return (
		<Form.Item label="Phone" name="phone">
			<Input type="tel" placeholder={placeholder} />
		</Form.Item>
	);
};
