import { Form, Input } from 'antd';
import { FC } from 'react';
import { rules } from '../../../config/Forms/rules';

type Props = {
	label?: string;
	placeholder?: string;
};

export const Email: FC<Props> = ({
	label = 'Email',
	placeholder = 'Email address'
}): JSX.Element => {
	return (
		<Form.Item label={label} name="email" rules={rules.email}>
			<Input placeholder={placeholder} />
		</Form.Item>
	);
};
