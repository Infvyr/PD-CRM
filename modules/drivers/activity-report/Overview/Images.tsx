import { VanImage } from '@proovia-crm/crm-api-types';
import { Image, Space } from 'antd';
import { FC } from 'react';
import placeholderImage from '../../../../public/assets/images/placeholder-100x100.jpeg';
import { StyledExpWrapper } from './Overview.styles';

type Props = {
	images: VanImage[];
};

export const Images: FC<Props> = ({ images }): JSX.Element => {
	return (
		<>
			{!images.length && 'No images uploaded yet!'}
			<StyledExpWrapper>
				<Image.PreviewGroup>
					<Space size="middle" style={{ flexWrap: 'wrap' }}>
						{images.length > 0 &&
							images.map((image) => (
								<Image
									key={image.id}
									src={image.zohoFilePath}
									fallback={placeholderImage.src}
									width={100}
									height={100}
									placeholder={
										<Image
											preview={false}
											src={placeholderImage.blurDataURL}
											width={100}
										/>
									}
								/>
							))}
					</Space>
				</Image.PreviewGroup>
			</StyledExpWrapper>
		</>
	);
};
