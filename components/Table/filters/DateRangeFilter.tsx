import {
	CheckboxOptionType,
	DatePicker,
	Form,
	Input,
	Radio,
	RadioChangeEvent,
	Space
} from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { ColumnType } from 'antd/lib/table';
import { useState, useMemo } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

type Props<T> = {
	column?: ColumnType<T>;
	options?: CheckboxOptionType[];
	initialValue?: string;
};

export function DateRangeFilter<T>({
	column,
	initialValue,
	options
}: Props<T>) {
	const [radioValue, setRadioValue] = useState<string>();
	const [rangePickerValue, setRangePickerValue] =
		useState<RangePickerProps['value']>();
	const form = Form.useFormInstance();

	const handleOnChange = (e: RadioChangeEvent) => {
		setRadioValue(e.target.value);
		if (e.target.value !== 'custom' && column?.key) {
			form.setFieldsValue({
				[`${column.key}`]: e.target.value
			});
		}
	};

	const handleOnDateRangeChange = (
		value: RangePickerProps['value'],
		formatString: [string, string]
	) => {
		setRangePickerValue(value);
		if (column?.key) {
			if (value === null) {
				form.setFieldsValue({
					[`${column.key}`]: value
				});
			} else {
				form.setFieldsValue({
					[`${column.key}`]: `$btw:${formatString[0]},${formatString[1]}`
				});
			}
		}
	};

	if (!column?.key) return null;

	const radioDefaultValue = useMemo(
		() =>
			options?.map((option) => option.value).includes(initialValue || '')
				? initialValue
				: 'custom',
		[options, initialValue]
	);

	const [fromDate, toDate] = useMemo(
		() =>
			radioDefaultValue === 'custom'
				? initialValue
						?.split(':')[1]
						?.split(',')
						.map((value) => (value ? moment(value) : null)) || []
				: [],
		[radioDefaultValue, initialValue]
	);

	return (
		<>
			<Form.Item name={`${column.key}`} hidden initialValue={initialValue}>
				<Input value={form.getFieldValue(`${column.key}`)} hidden />
			</Form.Item>
			<Radio.Group
				onChange={handleOnChange}
				value={radioValue}
				defaultValue={radioDefaultValue}
			>
				<Space direction="vertical">
					{options?.map((option, i) => (
						<Radio key={i} value={option.value}>
							{option.label}
						</Radio>
					))}
					<Radio value="custom">
						Custom
						<RangePicker
							defaultValue={[fromDate, toDate]}
							onFocus={() => setRadioValue('custom')}
							onChange={handleOnDateRangeChange}
							value={rangePickerValue}
						/>
					</Radio>
				</Space>
			</Radio.Group>
		</>
	);
}
