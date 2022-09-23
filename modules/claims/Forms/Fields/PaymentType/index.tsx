import { PAYMENT_STATUS_MAP } from '@proovia-crm/crm-api-types';
import { FC, useEffect, useContext } from 'react';
import { Select, Form } from 'antd';
import { StyledFormItem } from '../../styles/create.styles';
import { useClaimInfoByZohoOrder } from '../../../../zoho/hooks/useClaimInfoByZohoOrder';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';

const { Option } = Select;

export const PaymentType: FC = (): JSX.Element => {
	const { edit } = useContext(CreateEditClaimContext);
	const form = Form.useFormInstance();
	const orderId = Form.useWatch('orderId', form);

	const { paymentType, loading } = useClaimInfoByZohoOrder(orderId);

	useEffect(() => {
		if (!edit) {
			form.setFieldsValue({ paymentType });
		}
	}, [paymentType, form, edit]);

	return (
		<StyledFormItem name="paymentType" label="Payment Type">
			<Select
				showSearch
				allowClear
				placeholder="Payment Type"
				optionFilterProp="children"
				loading={loading}
			>
				{Object.keys(PAYMENT_STATUS_MAP).map((key: string) => (
					<Option key={key} value={key}>
						{PAYMENT_STATUS_MAP[key]}
					</Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
