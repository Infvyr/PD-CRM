import { Form, Input, Select } from 'antd';
import { FC } from 'react';
import { rules } from '../../../../config/Forms/rules';

export const AvailableHours: FC = (): JSX.Element => {
	return (
		<>
			<Form.Item name="whichTown" label="Available Hours">
				<Select allowClear placeholder="Please specify available hours">
					<Select.Option value="All">Open all hours</Select.Option>
					<Select.Option value="Weekdays">Weekdays</Select.Option>
					<Select.Option value="Everyday">Every day</Select.Option>
					<Select.Option value="Specific">Specific</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) =>
					prevValues.whichTown !== currentValues.whichTown
				}
			>
				{({ getFieldValue }) =>
					getFieldValue('whichTown') === 'Specific' ? (
						<Form.Item name="workingHours" rules={rules.availableHours}>
							<Input.TextArea
								placeholder="MO: 09:00-16:00"
								autoSize={{ minRows: 5, maxRows: 7 }}
							/>
						</Form.Item>
					) : null
				}
			</Form.Item>
		</>
	);
};
