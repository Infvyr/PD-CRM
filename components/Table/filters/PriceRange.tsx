import { FilterOperator } from '@proovia-crm/crm-api-types';
import { Form, Input, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ChangeEvent, useEffect, useState, useMemo } from 'react';

type PriceRangeProps<T> = {
	column?: ColumnType<T>;
	initialValue?: string;
};

export const PriceRange = <T,>({
	column,
	initialValue
}: PriceRangeProps<T>) => {
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

	const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fromValue = e.target.value;
		if (fromValue === '') {
			setFrom(undefined);
		} else if (!isNaN(+fromValue)) {
			setFrom(+fromValue);
		}
	};

	const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
		const toValue = e.target.value;
		if (toValue === '') {
			setTo(undefined);
		} else if (!isNaN(+toValue)) {
			setTo(+toValue);
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
				<Input
					prefix="£"
					type="number"
					placeholder="from"
					onChange={handleFromChange}
					defaultValue={fromInitialValue}
					value={from}
					min={0}
				/>
				-
				<Input
					prefix="£"
					type="number"
					placeholder="to"
					onChange={handleToChange}
					defaultValue={toInitialValue}
					value={to}
					min={0}
				/>
			</Space>
		</>
	);
};
