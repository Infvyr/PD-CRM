import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Form, Input, InputNumber, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useState, useMemo } from 'react';

type NumberRangeProps<T> = {
	column?: ColumnType<T>;
	initialValue?: string;
	prefix?: string;
};

export const NumberRange = <T,>({
	column,
	initialValue,
	prefix = ''
}: NumberRangeProps<T>) => {
	const form = Form.useFormInstance();
	const [from, setFrom] = useState<number | undefined>();
	const [to, setTo] = useState<number | undefined>();

	useEffect(() => {
		if (from === undefined && to === undefined) {
			form.setFieldsValue({ [`${column?.key}`]: undefined });
		} else if (from !== undefined && to === undefined) {
			form.setFieldsValue({
				[`${column?.key}`]: `${FilterOperator.GTE}:${from}`
			});
		} else if (from === undefined && to !== undefined) {
			form.setFieldsValue({
				[`${column?.key}`]: `${FilterOperator.LTE}:${to}`
			});
		} else {
			form.setFieldsValue({
				[`${column?.key}`]: `${FilterOperator.BTW}:${from},${to}`
			});
		}
	}, [from, to, form, column?.key]);

	const handleFromChange = (value: number | string) => {
		if (value === '') {
			setFrom(undefined);
		} else if (!isNaN(+value)) {
			setFrom(+value);
		}
	};

	const handleToChange = (value: number | string) => {
		if (value === '') {
			setTo(undefined);
		} else if (!isNaN(+value)) {
			setTo(+value);
		}
	};

	if (!column?.key) return null;

	const [fromInitialValue, toInitialValue] = useMemo(() => {
		const [filterOperator, filterValue] = initialValue?.split(':') || [];
		switch (filterOperator) {
			case FilterOperator.GTE: {
				return [filterValue, undefined];
			}
			case FilterOperator.LTE: {
				return [undefined, filterValue];
			}
			case FilterOperator.BTW: {
				return filterValue.split(',');
			}
			default: {
				return [undefined, undefined];
			}
		}
	}, [initialValue]);

	return (
		<>
			<Form.Item name={`${column?.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column?.key}`)} hidden />
			</Form.Item>
			<Space>
				<InputNumber
					prefix={prefix}
					type="number"
					placeholder="from"
					onChange={handleFromChange}
					defaultValue={+fromInitialValue!}
					value={from}
					min={0}
				/>
				-
				<InputNumber
					prefix={prefix}
					type="number"
					placeholder="to"
					onChange={handleToChange}
					defaultValue={+toInitialValue!}
					value={to}
					min={0}
				/>
			</Space>
		</>
	);
};
