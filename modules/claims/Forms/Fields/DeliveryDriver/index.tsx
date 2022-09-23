import { FC, useEffect, useContext } from 'react';
import { Select, Form } from 'antd';
import { StyledFormItem } from '../../styles/create.styles';
import { useClaimInfoByZohoOrder } from '../../../../zoho/hooks/useClaimInfoByZohoOrder';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';

const { Option } = Select;

export const DeliveryDriver: FC = (): JSX.Element => {
	const { edit } = useContext(CreateEditClaimContext);
	const form = Form.useFormInstance();
	const orderId = Form.useWatch('orderId', form);

	const { drivers, deliveryDriver, loading } = useClaimInfoByZohoOrder(orderId);

	useEffect(() => {
		if (!edit) {
			form.setFieldsValue({ deliveryDriverId: deliveryDriver?.id });
		}
	}, [deliveryDriver, form, edit]);

	return (
		<StyledFormItem name="deliveryDriverId" label="Delivery Driver">
			<Select
				showSearch
				allowClear
				loading={loading}
				placeholder="Delivery Driver"
				optionFilterProp="children"
			>
				{drivers?.data.map((driver) => (
					<Option key={driver.id} value={driver.id}>
						{driver.name}
					</Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
