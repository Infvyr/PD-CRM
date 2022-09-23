import { Form, Input } from 'antd';
import { FC } from 'react';

type Props = {
	label?: string;
	placeholder?: string;
};

export const ContactName: FC<Props> = ({
	label = 'Contact name',
	placeholder = 'Contact Name'
}): JSX.Element => {
	return (
		<Form.Item label={label} name="contactName">
			<Input placeholder={placeholder} />
		</Form.Item>
	);
};
