import { Divider, Form, Tooltip, Typography } from 'antd';
import { StyledAlignment } from 'apps/crm-app/styles';
import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { StyledInputNumber } from './OrderTotalPrice.styles';

export const OrderTotalPrice: FC = (): JSX.Element => {
	const [readOnly, setReadOnly] = useState<boolean>(true);

	const handleOnFocus = () => setReadOnly(false);
	const handleOnBlur = () => setReadOnly(true);

	return (
		<>
			<Divider />
			<StyledAlignment display="flex" gap="16px" alignContent="center">
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					Total Price
				</Typography.Title>
				<Form.Item name="totalPrice" style={{ marginBottom: 0 }}>
					<StyledInputNumber
						readOnly={readOnly}
						addonBefore="£"
						addonAfter={
							<Tooltip title="You can edit the total price value using this number format: 50, 45.85">
								<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.4)' }} />
							</Tooltip>
						}
						onFocus={handleOnFocus}
						onBlur={handleOnBlur}
					/>
				</Form.Item>
			</StyledAlignment>
		</>
	);
};
