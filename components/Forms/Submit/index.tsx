import { Button, Form, FormInstance, Space } from 'antd';
import { FC } from 'react';

interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	edit?: boolean;
	form: FormInstance;
}

export const Submit: FC<Props> = ({
	isLoading,
	disabled,
	edit = false,
	form
}): JSX.Element => {
	const handleFormSubmit = () => form?.submit();
	const handleFormReset = () => form?.resetFields();

	return (
		<Form.Item style={{ marginBottom: 0 }}>
			<Space>
				<Button
					type="primary"
					htmlType="submit"
					loading={isLoading}
					disabled={disabled}
					onClick={handleFormSubmit}
				>
					{edit ? 'Update' : 'Submit'}
				</Button>
				{!edit && (
					<Button htmlType="reset" onClick={handleFormReset}>
						Reset
					</Button>
				)}
			</Space>
		</Form.Item>
	);
};
