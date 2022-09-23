import { FC } from 'react';
import { Select } from 'antd';
import { StyledFormItem } from '../../../modules/claims/Forms/styles/create.styles';
import { CLAIM_STATUS_MAP } from '@proovia-crm/crm-api-types';

const { Option } = Select;

type Props = {
	hasFeedback?: boolean;
};

export const Status: FC<Props> = ({ hasFeedback = true }): JSX.Element => {
	return (
		<StyledFormItem name="status" label="Status" hasFeedback={hasFeedback}>
			<Select
				showSearch
				allowClear
				placeholder="Status"
				optionFilterProp="children"
			>
				{Object.keys(CLAIM_STATUS_MAP).map((key: string) => (
					<Option key={key} value={key}>
						{CLAIM_STATUS_MAP[key]}
					</Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
