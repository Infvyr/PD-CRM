import { DATE_OPTION } from '@proovia-crm/crm-api-types';
import { CheckboxOptionType } from 'antd';

export const addedTimeOptions: CheckboxOptionType[] = [
	{ label: 'Today', value: DATE_OPTION.TODAY },
	{ label: 'Last 7 days', value: DATE_OPTION.LAST_7DAYS },
	{ label: 'Last 30 days', value: DATE_OPTION.LAST_30DAYS }
];
