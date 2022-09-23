import { Form, Select, SelectProps } from 'antd';
import { ComponentPropsWithRef, FC } from 'react';
import { useProfiles } from './hooks/useProfiles';

type Props = {
	selectProps?: ComponentPropsWithRef<typeof Select>;
} & ComponentPropsWithRef<typeof Form.Item>;

const ProfileSelect: FC<Props> = ({ selectProps, ...formItemProps }) => {
	const { data: profiles } = useProfiles();

	const options: SelectProps['options'] = profiles?.data.map((profile) => ({
		label: profile.name,
		value: profile.id
	}));

	return (
		<Form.Item
			name="profile"
			rules={[{ required: true, message: 'Please select profile!' }]}
			{...formItemProps}
		>
			<Select
				showSearch
				allowClear
				placeholder="Select a profile"
				options={options}
				optionFilterProp="label"
				{...selectProps}
			/>
		</Form.Item>
	);
};

export default ProfileSelect;
