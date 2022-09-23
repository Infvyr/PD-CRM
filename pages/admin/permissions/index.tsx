import CustomHead from '../../../components/Head';
import { CustomPageHeader, CustomButton } from '../../../components';
import { PlusOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import PermissionsTable from '../../../modules/admin/permissions/PermissionsTable';
import NewPermissionModal from '../../../modules/admin/permissions/NewPermissionModal';

const Permissions: FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<>
			<CustomHead title="Permissions" />
			<CustomPageHeader
				backIcon={false}
				title="Permissions"
				extra={[
					<CustomButton
						btnText="New permission"
						key="addButton"
						icon={<PlusOutlined />}
						onClick={() => setModalVisible(true)}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<NewPermissionModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
			/>
			<PermissionsTable />
		</>
	);
};

export default withAdminLayout(Permissions);
