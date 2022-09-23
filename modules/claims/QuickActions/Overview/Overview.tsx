import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Divider, Drawer } from 'antd';
import { Claim } from '@proovia-crm/crm-api-types';
import { EditOutlined } from '@ant-design/icons';
import { Info } from '../../Overview/Info';
import { Gallery } from '../../Overview/Gallery';

type Props = {
	record: Claim;
	onClose: () => void;
	isDrawerVisible: boolean;
};

export const Overview: FC<Props> = ({
	record,
	onClose,
	isDrawerVisible
}: Props): JSX.Element => {
	const router = useRouter();

	const onEdit = () => router.push(`/claims/edit/${record.id}`);

	return (
		<>
			<Drawer
				title="Overview"
				onClose={onClose}
				visible={isDrawerVisible}
				width="80vw"
				extra={
					<Button onClick={onEdit} type="primary" icon={<EditOutlined />}>
						Edit
					</Button>
				}
			>
				<Info {...record} />
				<Divider />
				<Gallery claimId={record?.id!} />
			</Drawer>
		</>
	);
};
