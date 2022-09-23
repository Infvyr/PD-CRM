import { Input } from 'antd';
import { FC } from 'react';
import { StyledFormItem } from '../../styles/create.styles';

export const CustomerClaimAmount: FC = (): JSX.Element => {
	return (
		<StyledFormItem
			name="customerClaimAmount"
			label="Customer Amount"
			rules={[{ required: true, message: 'Please input this field!' }]}
		>
			<Input
				addonAfter="£"
				placeholder="Customer amount"
				maxLength={6}
				min={0}
				max={9999}
				pattern="[0-9]{6}"
			/>
		</StyledFormItem>
	);
};
