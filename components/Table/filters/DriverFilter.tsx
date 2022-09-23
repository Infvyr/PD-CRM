import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Form, Input, Select, SelectProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { BaseSelectProps } from 'rc-select/lib/BaseSelect';
import { useState } from 'react';
import { useDrivers } from '../../../modules/drivers/hooks/useDrivers';

type SelectFilterProps<T> = SelectProps & {
	column?: ColumnType<T>;
	initialValue?: string;
};

export const DriverFilter = <T,>({
	column,
	initialValue,
	...rest
}: SelectFilterProps<T>) => {
	const [open, setOpen] = useState<boolean>(false);
	const form = Form.useFormInstance();
	const { data } = useDrivers();
	const defaultValue = initialValue?.split(':')[1]?.split(',');

	const handleOnChange = (value: unknown) => {
		if (column?.key && Array.isArray(value)) {
			form.setFieldsValue({
				[`${column.key}`]:
					value.length === 0
						? undefined
						: `${FilterOperator.LIKE}:${value
								.map((value: string) => value.trim())
								.join(',')}`
			});
		}
	};

	const showSelectDropdown = () => setOpen(true);
	const hideSelectDropdown = () => setOpen(false);

	const handleKeyDown: BaseSelectProps['onInputKeyDown'] = (event) => {
		if (event.key === 'Enter') {
			console.log(open, event.key);
			hideSelectDropdown();
			if (!open) {
				form?.submit();
			}
		} else {
			showSelectDropdown();
		}

		if (event.key === 'ArrowDown') {
			showSelectDropdown();
		}

		if (event.key === 'Escape') {
			hideSelectDropdown();
		}
	};

	if (!column?.key) return null;

	return (
		<>
			<Form.Item name={`${column.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column.key}`)} />
			</Form.Item>
			<Select
				{...rest}
				mode="multiple"
				tokenSeparators={[',']}
				onChange={handleOnChange}
				onFocus={showSelectDropdown}
				onBlur={hideSelectDropdown}
				onSelect={hideSelectDropdown}
				dropdownClassName="ant-custom-select-hide"
				dropdownRender={(originNode) => {
					return <div>{open ? originNode : null}</div>;
				}}
				onInputKeyDown={handleKeyDown}
				defaultValue={defaultValue}
				notFoundContent="No driver found!"
				style={{ width: '100%' }}
			>
				{data?.data &&
					data?.data?.map((driver) => (
						<Select.Option key={driver.id} value={driver.name}>
							{driver.name}
						</Select.Option>
					))}
			</Select>
		</>
	);
};
