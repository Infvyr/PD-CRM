import { Form, Select } from 'antd';
import { FC, useEffect, useContext } from 'react';
import { StyledFormItem } from '../../styles/create.styles';
import { useClaimInfoByZohoOrder } from '../../../../zoho/hooks/useClaimInfoByZohoOrder';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';
const { Option } = Select;

export const CollectionDriver: FC = () => {
	const { edit } = useContext(CreateEditClaimContext);
	const form = Form.useFormInstance();
	const orderId = Form.useWatch('orderId', form);

	const { drivers, collectionDriver, loading } =
		useClaimInfoByZohoOrder(orderId);

	useEffect(() => {
		if (!edit) {
			form.setFieldsValue({ collectionDriverId: collectionDriver?.id });
		}
	}, [collectionDriver, form, edit]);

	return (
		<StyledFormItem name="collectionDriverId" label="Collection Driver">
			<Select
				showSearch
				allowClear
				loading={loading}
				placeholder="Collection Driver"
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
