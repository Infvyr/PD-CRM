import { ClaimImageFile, ClaimImageType } from '@proovia-crm/crm-api-types';
import { Tabs, Space, Badge } from 'antd';
import { groupBy } from 'lodash';
import { FC, useMemo } from 'react';
import { ImageListItem } from '../ClaimImageList/ImageListItem';
import { ClaimImageList } from '../ClaimImageList/index';
import { ClaimMediaTabsWrapper } from './ClaimMediaTabs.styles';

interface Props {
	images?: ClaimImageFile[];
	onChange?: (claimImages: ClaimImageFile[]) => void;
}

export const ClaimMediaTabs: FC<Props> = ({ images = [], onChange }) => {
	const imagesGroupedByType = useMemo(() => groupBy(images, 'type'), [images]);

	const handleOnChange = (type: ClaimImageType, fileList: ClaimImageFile[]) => {
		const newFileList = fileList.map((file) => {
			file.type = type;
			return file;
		});
		imagesGroupedByType[type] = newFileList;

		onChange?.([
			...(imagesGroupedByType.collection || []),
			...(imagesGroupedByType.delivery || []),
			...(imagesGroupedByType.customer || [])
		]);
	};

	const tabPanes = [
		{
			key: 'collection',
			title: 'Collection images',
			type: ClaimImageType.COLLECTION,
			value: imagesGroupedByType.collection
		},
		{
			key: 'delivery',
			title: 'Delivery images',
			type: ClaimImageType.DELIVERY,
			value: imagesGroupedByType.delivery
		},
		{
			key: 'customer',
			title: 'Customer images',
			type: ClaimImageType.CUSTOMER,
			value: imagesGroupedByType.customer
		}
	];

	return (
		<ClaimMediaTabsWrapper>
			<Tabs defaultActiveKey={tabPanes[0].key} type="card">
				{tabPanes.map(({ key, title, type, value = [] }) => (
					<Tabs.TabPane
						key={key}
						tab={
							<Space>
								<span>{title}</span>
								<Badge count={value.length} showZero></Badge>
							</Space>
						}
					>
						<ClaimImageList
							itemRender={(originNode, file, fileList, actions) => (
								<ImageListItem
									key={file.uid}
									file={file as ClaimImageFile}
									onDelete={actions.remove}
									type={type}
									onChange={() => {
										handleOnChange(type, fileList as ClaimImageFile[]);
									}}
								/>
							)}
							value={value}
							onChange={(fileList) =>
								handleOnChange(type, fileList as ClaimImageFile[])
							}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</ClaimMediaTabsWrapper>
	);
};
