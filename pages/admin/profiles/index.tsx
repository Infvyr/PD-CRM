import { CustomPageHeader, CustomButton } from '../../../components';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import { ProfilesTable } from '../../../modules/admin/profiles/ProfilesTable';
import { PlusOutlined } from '@ant-design/icons';
import CustomHead from '../../../components/Head';
import NewProfileModal from '../../../modules/admin/profiles/NewProfileModal';
import { FC, useState } from 'react';

const Profiles: FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<>
			<CustomHead title="Profiles" />
			<CustomPageHeader
				backIcon={false}
				title="Profiles"
				extra={[
					<CustomButton
						btnText="New Profile"
						key="addButton"
						icon={<PlusOutlined />}
						onClick={() => setModalVisible(true)}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<NewProfileModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
			/>
			<ProfilesTable />
		</>
	);
};

export default withAdminLayout(Profiles);
