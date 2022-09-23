import { Form, Input } from 'antd';
import { FC } from 'react';

type Props = {
	name: string;
	label: string;
	placeholder: string;
};

export const SimpleInput: FC<Props> = ({
	name = 'name',
	label = 'Label',
	placeholder = ''
}): JSX.Element => {
	return (
		<Form.Item label={label} name={name}>
			<Input placeholder={placeholder} />
		</Form.Item>
	);
};
