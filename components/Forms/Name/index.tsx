import { Form, Input } from 'antd';
import { FC } from 'react';
import { rules } from '../../../config/Forms/rules';

type Props = {
	label?: string;
	placeholder?: string;
};

export const Name: FC<Props> = ({
	label = 'Contact name',
	placeholder = 'Name'
}): JSX.Element => {
	return (
		<Form.Item label={label} name="name" rules={rules.name}>
			<Input placeholder={placeholder} />
		</Form.Item>
	);
};
