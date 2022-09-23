import NewRoleModal from '../../../modules/admin/roles/NewRoleModal';
import { RolesTree } from '../../../modules/admin/roles/RolesTree';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import RolesTable from '../../../modules/admin/roles/RolesTable';
import CustomHead from '../../../components/Head/index';
import { FC, useState } from 'react';
import { Space, Switch } from 'antd';
import { CustomPageHeader, CustomButton } from '../../../components';
import { PlusOutlined } from '@ant-design/icons';

const Roles: FC = () => {
	const [showRolesTree, setShowRolesTree] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);

	const handleOnShowTree = (checked: boolean) => {
		setShowRolesTree(checked);
	};

	return (
		<>
			<CustomHead title="Roles" />
			<CustomPageHeader
				backIcon={false}
				title="Roles"
				extra={[
					<CustomButton
						btnText="New Role"
						key="addButton"
						icon={<PlusOutlined />}
						onClick={() => setModalVisible(true)}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<NewRoleModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
			/>
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				<div>
					<span>Show hierarchy: </span>
					<Switch onChange={handleOnShowTree} checked={showRolesTree} />
				</div>
				{showRolesTree && <RolesTree />}
				{!showRolesTree && <RolesTable />}
			</Space>
		</>
	);
};

export default withAdminLayout(Roles);
