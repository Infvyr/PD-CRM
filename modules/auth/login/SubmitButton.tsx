import { FC } from 'react';
import { Button, Form } from 'antd';

interface Props {
	isLoading: boolean;
	disabled?: boolean;
}

export const SubmitButton: FC<Props> = ({
	isLoading,
	disabled
}): JSX.Element => {
	return (
		<Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				block
				loading={isLoading}
				disabled={disabled}
			>
				Sign In
			</Button>
		</Form.Item>
	);
};
