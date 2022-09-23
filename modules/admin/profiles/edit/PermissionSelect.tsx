import { Permission } from '@proovia-crm/crm-api-types';
import { Select, Space, Tooltip } from 'antd';
import { FC, ComponentPropsWithRef } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;

type Props = {
	permissions: Permission[];
} & ComponentPropsWithRef<typeof FormItem>;

const PermissionSelect: FC<Props> = ({ permissions, ...formItemProps }) => {
	if (permissions.length === 0) return null;

	return (
		<FormItem {...formItemProps} style={{ marginBottom: 0 }}>
			<Select
				style={{ width: '100%' }}
				mode="multiple"
				showArrow
				bordered={false}
				placeholder="Select permissions"
			>
				{permissions.map((permission) => {
					const name =
						Object.keys(permission.conditions || {}).length === 0 &&
						Object.keys(permission.fields || {}).length === 0
							? permission.action
							: permission.name;
					return (
						<Option key={permission.id} value={permission.id}>
							<Space>
								{name}
								<Tooltip title={permission.description || permission.name}>
									<QuestionCircleOutlined />
								</Tooltip>
							</Space>
						</Option>
					);
				})}
			</Select>
		</FormItem>
	);
};

export default PermissionSelect;
