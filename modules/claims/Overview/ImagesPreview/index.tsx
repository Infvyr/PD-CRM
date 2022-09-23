import { ClaimImage } from '@proovia-crm/crm-api-types';
import { Image, Row } from 'antd';
import { FC } from 'react';
import placeholderImage from '../../../../public/assets/images/placeholder-100x100.jpeg';
import { StyledImageContainer, StyledParagraph } from '../Gallery.styles';

type Props = {
	images: ClaimImage[];
};

export const ImagesPreview: FC<Props> = ({ images }): JSX.Element => {
	return (
		<Image.PreviewGroup>
			<Row gutter={[24, 24]}>
				{images.map((img) => {
					return (
						<StyledImageContainer
							xs={24}
							sm={12}
							lg={4}
							key={img.id}
							note={img.note}
						>
							{img.url && (
								<>
									<Image
										width={100}
										height={100}
										src={img.url ?? 'error'}
										fallback={placeholderImage.src}
										style={{ objectFit: 'cover' }}
										placeholder={
											<Image
												preview={false}
												src={placeholderImage.blurDataURL}
												width={100}
											/>
										}
									/>
									{img.note && (
										<StyledParagraph
											ellipsis={{
												rows: 4,
												expandable: true
											}}
										>
											{img.note}
										</StyledParagraph>
									)}
								</>
							)}
						</StyledImageContainer>
					);
				})}
			</Row>
		</Image.PreviewGroup>
	);
};
