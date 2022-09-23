import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Form, Input, InputProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ChangeEvent } from 'react';

type InputFilterProps<T> = InputProps & {
	column?: ColumnType<T>;
	initialValue?: string;
	placeholder?: string;
};

export const InputFilter = <T,>({
	column,
	initialValue,
	placeholder = 'Search something...',
	...rest
}: InputFilterProps<T>) => {
	const form = Form.useFormInstance();

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (column?.key) {
			form.setFieldsValue({
				[`${column.key}`]:
					value.length === 0 ? undefined : `${FilterOperator.LIKE}:${value}`
			});
		}
	};

	if (!column?.key) return null;

	return (
		<>
			<Form.Item name={`${column.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column.key}`)} />
			</Form.Item>
			<Input
				style={{ width: '100%' }}
				onChange={handleOnChange}
				defaultValue={initialValue}
				placeholder={placeholder}
				{...rest}
			/>
		</>
	);
};
