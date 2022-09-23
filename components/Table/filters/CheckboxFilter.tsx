import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Checkbox, CheckboxOptionType, Form, Input } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ColumnType } from 'antd/lib/table';

type CheckboxFilterProps<T> = {
	column?: ColumnType<T>;
	options?: CheckboxOptionType[];
	initialValue?: string;
};

export const CheckboxFilter = <T,>({
	column,
	options,
	initialValue
}: CheckboxFilterProps<T>) => {
	const form = Form.useFormInstance();

	const handleOnChange = (value: CheckboxValueType[]) => {
		if (column?.key) {
			form.setFieldsValue({
				[`${column.key}`]: value.length
					? `${FilterOperator.IN}:${value.join(',')}`
					: undefined
			});
		}
	};

	if (!column?.key) return null;

	return (
		<>
			<Form.Item name={`${column.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column.key}`)} hidden />
			</Form.Item>
			<Checkbox.Group
				onChange={handleOnChange}
				defaultValue={initialValue?.split(':')[1]?.split(',') || []}
			>
				{options?.map((option, i) => (
					<div key={i}>
						<Checkbox value={option.value}>{option.label}</Checkbox>
					</div>
				))}
			</Checkbox.Group>
		</>
	);
};
