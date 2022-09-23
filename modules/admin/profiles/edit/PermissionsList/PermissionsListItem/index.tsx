import { Permission } from '@proovia-crm/crm-api-types';
import { Col, Switch, Form, Row, List } from 'antd';
import { FC, useState } from 'react';
import PermissionSelect from '../../PermissionSelect';

type Props = {
	subject: string;
	permissions: Permission[];
};

const PermissionsListItem: FC<Props> = ({ subject, permissions }) => {
	const form = Form.useFormInstance();
	const fieldValue = form.getFieldValue(subject);
	const [checked, setChecked] = useState(() =>
		Array.isArray(fieldValue) ? !!fieldValue.length : false
	);

	const handleOnSwitchChange = (checked: boolean) => {
		if (checked) {
			form.setFieldsValue({
				[subject]: permissions.map((permission) => permission.id)
			});
		}
		setChecked(checked);
	};

	return (
		<List.Item style={{ height: '50px' }}>
			<Row align="middle" style={{ width: '100%' }}>
				<Col span={4}>
					<b>{subject}</b>
				</Col>
				<Col span={2} className="text-center">
					<Switch checked={checked} onChange={handleOnSwitchChange} />
				</Col>
				<Col span={18}>
					{checked && (
						<PermissionSelect name={`${subject}`} permissions={permissions} />
					)}
				</Col>
			</Row>
		</List.Item>
	);
};

export default PermissionsListItem;
