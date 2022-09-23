import { FC } from 'react';
import { Select, Form } from 'antd';
import { StyledFormItem } from '../../styles/create.styles';
import { useDrivers } from '../../../../drivers/hooks/useDrivers';

const { Option } = Select;

export const GuiltyDriver: FC = (): JSX.Element => {
	const form = Form.useFormInstance();
	const { data: drivers } = useDrivers();

	const isWarehouseGuilty = Form.useWatch('isWarehouseGuilty', form);
	const disabled = !!isWarehouseGuilty;

	return (
		<StyledFormItem name="guiltyDriverId" label="Guilty driver">
			<Select
				showSearch
				allowClear
				placeholder="Who's responsible?"
				optionFilterProp="children"
				disabled={disabled}
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
