import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Form, Input, Select, SelectProps } from 'antd';
import { ColumnType } from 'antd/lib/table';

type SelectFilterProps<T> = SelectProps & {
	column?: ColumnType<T>;
	initialValue?: string;
};

export const SelectFilter = <T,>({
	column,
	initialValue,
	...rest
}: SelectFilterProps<T>) => {
	const form = Form.useFormInstance();

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

	if (!column?.key) return null;

	const defaultValue = initialValue?.split(':')[1]?.split(',');

	return (
		<>
			<Form.Item name={`${column.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column.key}`)} />
			</Form.Item>
			<Select
				mode="tags"
				style={{ width: '100%' }}
				tokenSeparators={[',']}
				onChange={handleOnChange}
				defaultValue={defaultValue}
				{...rest}
			/>
		</>
	);
};
