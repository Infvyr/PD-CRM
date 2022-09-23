import { Checkbox, Form } from 'antd';
import { FC } from 'react';
import { StyledFormItem } from '../styles/create.styles';

export const GuiltyWarehouse: FC = () => {
	const form = Form.useFormInstance();
	const guiltyDriver = Form.useWatch('guiltyDriverId', form);
	const disabled = !!guiltyDriver;

	return (
		<StyledFormItem
			label="Guilty warehouse"
			name="isWarehouseGuilty"
			valuePropName="checked"
		>
			<Checkbox disabled={disabled}>Is warehouse guilty?</Checkbox>
		</StyledFormItem>
	);
};
