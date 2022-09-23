import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Divider, Drawer } from 'antd';
import { Claim } from '@proovia-crm/crm-api-types';
import { EditOutlined } from '@ant-design/icons';
import { namedComponent } from '../../../config/dynamic-component';

const Dynamic = {
	Info: dynamic(() => namedComponent(import('./Info'), 'Info'), {
		ssr: false
	}),
	Gallery: dynamic(() => namedComponent(import('./Gallery'), 'Gallery'), {
		ssr: false
	})
};

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
				<Dynamic.Info {...record} />
				<Divider />
				<Dynamic.Gallery claimId={record?.id!} />
			</Drawer>
		</>
	);
};
