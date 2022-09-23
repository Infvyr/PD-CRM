import { ClaimImageType } from '@proovia-crm/crm-api-types';
import { FC, useMemo } from 'react';
import { Tabs, Typography } from 'antd';
import { useClaimImages } from '../hooks/useClaimImages';
import { EmptyData } from '../../../components';
import { ImagesPreview } from './ImagesPreview';

type Props = {
	claimId: number;
};

const infoMessage = 'No images uploaded yet!';
const errorMessage = 'Loading images failed!';

export const Gallery: FC<Props> = ({ claimId }): JSX.Element => {
	const { data, error } = useClaimImages(claimId);
	const images = data?.images ?? [];
	const deliveryImages = useMemo(
		() => images.filter((image) => image.type === ClaimImageType.DELIVERY),
		[images]
	);
	const collectionImages = useMemo(
		() => images.filter((image) => image.type === ClaimImageType.COLLECTION),
		[images]
	);
	const customerImages = useMemo(
		() => images.filter((image) => image.type === ClaimImageType.CUSTOMER),
		[images]
	);

	const imagesArr = [
		{
			label: 'Collection',
			type: collectionImages
		},
		{
			label: 'Delivery',
			type: deliveryImages
		},
		{
			label: 'Customer',
			type: customerImages
		}
	];

	if (error)
		return (
			<>
				<Typography.Title level={5}>Claim Images</Typography.Title>
				<p>{errorMessage}</p>
			</>
		);

	return (
		<>
			<Typography.Title level={5}>Claim Images</Typography.Title>
			<Tabs defaultActiveKey="collection" type="card">
				{imagesArr.map((item) => (
					<Tabs.TabPane tab={item.label} key={item.label}>
						{item.type.length > 0 ? (
							<ImagesPreview images={item.type} />
						) : (
							<EmptyData description={infoMessage} />
						)}
					</Tabs.TabPane>
				))}
			</Tabs>
		</>
	);
};
