import { Claim } from '@proovia-crm/crm-api-types';
import { message, Modal, Tag } from 'antd';
import { FC, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { ClaimsApi } from '../../../../api/claims.api';
import { StyledButton } from '../QuickActions.styles';

type Props = {
	data: Claim[];
	record: Claim;
};

export const DeleteButton: FC<Props> = ({
	data,
	record
}: Props): JSX.Element => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const claimsApi = new ClaimsApi();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleDeleteRecord = (id: number) => async () => {
		try {
			await claimsApi.deleteClaim(id);
			return data.filter((item) => {
				if (item.id === record.id) {
					return message.error(`Claim has successfully been deleted!`);
				}
				setIsModalVisible(false);
			});
		} catch (error) {
			message.error('Sorry, error on the server!');
			setTimeout(() => setIsModalVisible(false), 2000);
		}
	};

	return (
		<>
			<StyledButton type="link" onClick={showModal} icon={<DeleteOutlined />}>
				Delete
			</StyledButton>
			<Modal
				visible={isModalVisible}
				maskClosable={false}
				onOk={handleDeleteRecord(record.id)}
				onCancel={handleCancel}
				okText="Delete"
			>
				<h3>
					Do you want to delete the claim for the order
					<Tag color="gold" style={{ fontSize: '1rem' }}>
						#{record.order}
					</Tag>
				</h3>
			</Modal>
		</>
	);
};
