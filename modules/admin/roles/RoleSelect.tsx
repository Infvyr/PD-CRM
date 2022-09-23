import { Form, Select, TreeSelect } from 'antd';
import { ComponentPropsWithRef, FC } from 'react';
import { useRolesTree } from './hooks/useRolesTree';

type Props = {
	selectProps?: ComponentPropsWithRef<typeof Select>;
} & ComponentPropsWithRef<typeof Form.Item>;

const RoleSelect: FC<Props> = ({ selectProps, ...formItemProps }) => {
	const { data: rolesTree } = useRolesTree();

	return (
		<Form.Item
			name="role"
			rules={[{ required: true, message: "Please select user's role" }]}
			{...formItemProps}
		>
			<TreeSelect
				aria-autocomplete="none"
				showSearch
				allowClear
				treeDefaultExpandAll
				dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 300 }}
				placeholder="Select user role"
				style={{ width: '100%' }}
				treeData={rolesTree}
				treeNodeFilterProp="title"
				{...selectProps}
			/>
		</Form.Item>
	);
};

export default RoleSelect;
