import { Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FC } from 'react';
import { ClaimMediaTabs } from './ClaimMediaTabs';
import { OrderImagesContainer } from './OrderImagesContainer';

export const ClaimMedia: FC = (): JSX.Element => {
	return (
		<>
			<Divider orientation="left">
				<b>Claim images</b>
			</Divider>
			<OrderImagesContainer>
				<FormItem name="claimImages" valuePropName="images">
					<ClaimMediaTabs />
				</FormItem>
			</OrderImagesContainer>
		</>
	);
};
