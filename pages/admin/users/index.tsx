import { CustomPageHeader, CustomButton } from '../../../components';
import { withAdminLayout } from '../../../modules/admin/HOC/withAdminLayout';
import { PlusOutlined } from '@ant-design/icons';
import CustomHead from '../../../components/Head';
import NewEditUserModal from '../../../modules/admin/users/NewEditUserModal';
import { useState, useCallback, FC } from 'react';
import { User } from '@proovia-crm/crm-api-types';
import { useRouter } from 'next/router';
import { UsersTable } from '../../../modules/admin/users/UsersTable';

const Users: FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const router = useRouter();

	const handleOnNameClick = useCallback(
		(user: User) => router.push(`${router.asPath}/${user.id}`),
		[router]
	);

	return (
		<>
			<CustomHead title="Users" />
			<CustomPageHeader
				backIcon={false}
				title="Users"
				extra={[
					<CustomButton
						btnText="New User"
						key="addButton"
						icon={<PlusOutlined />}
						onClick={() => setModalVisible(true)}
					/>
				]}
				style={{ left: '302px' }}
			/>
			<NewEditUserModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
			/>
			<UsersTable onNameClick={handleOnNameClick} />
		</>
	);
};

export default withAdminLayout(Users);
