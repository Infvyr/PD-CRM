import { Form, Select, Spin } from 'antd';
import { FC, useEffect } from 'react';
import { useDriversKarmaRules } from '../../../drivers/karma/hooks/useDriversKarma';

const { Option } = Select;

export const DriverKarmaRuleSelect: FC = (): JSX.Element => {
	const { data: karmaRules } = useDriversKarmaRules();

	useEffect(() => {}, []);

	return (
		<Form.Item
			name="karmaRuleId"
			label="Sin"
			rules={[{ required: true }]}
			style={{ marginBottom: 0 }}
		>
			<Select
				showSearch
				loading={!karmaRules}
				placeholder="Select sin"
				optionFilterProp="children"
				notFoundContent={!karmaRules ? <Spin size="small" /> : null}
				style={{ width: '100%' }}
			>
				{karmaRules?.data.map((karmaRule) => (
					<Option
						key={karmaRule.id}
						value={karmaRule.id}
						className="karma-select-option"
					>
						{karmaRule.rule}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};
