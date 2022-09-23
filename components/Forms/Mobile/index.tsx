import { Form, Input } from 'antd';
import { FC } from 'react';

type Props = {
	label?: string;
	placeholder?: string;
};

export const Mobile: FC<Props> = ({
	label = 'Mobile',
	placeholder = 'Mobile number'
}): JSX.Element => {
	return (
		<Form.Item label={label} name="mobile">
			<Input type="tel" placeholder={placeholder} />
		</Form.Item>
	);
};
