import { FC } from 'react';
import { useRouter } from 'next/router';
import { EditOutlined } from '@ant-design/icons';
import { Claim } from '@proovia-crm/crm-api-types';
import { StyledButton } from '../QuickActions.styles';

type Props = {
	data: Claim[];
	record: Claim;
};

export const EditButton: FC<Props> = ({ data, record }: Props): JSX.Element => {
	const router = useRouter();

	const handleEditRecord = () => {
		return data.filter((item) => {
			if (item.id === record.id) {
				return router.push(`/claims/edit/${item.id}`);
			}
			return;
		});
	};

	return (
		<StyledButton
			type="link"
			onClick={handleEditRecord}
			icon={<EditOutlined />}
		>
			Edit
		</StyledButton>
	);
};
