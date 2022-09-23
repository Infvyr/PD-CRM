import { Input } from 'antd';
import { FC } from 'react';
import { StyledFormItem } from '../../styles/create.styles';

export const SettledAmount: FC = (): JSX.Element => {
	return (
		<StyledFormItem name="settledAmount" label="Settled amount">
			<Input
				addonAfter="£"
				placeholder="0"
				maxLength={6}
				min={0}
				max={9999}
				pattern="[0-9]{6}"
			/>
		</StyledFormItem>
	);
};
