import { Form, Spin } from 'antd';
import { nanoid } from 'nanoid';
import { FC, useContext, useEffect } from 'react';
import { useOrderImages } from '../../../../orders/hooks/useOrderImages';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';

export const OrderImagesContainer: FC = ({ children }) => {
	const form = Form.useFormInstance();
	const orderId: number | undefined = Form.useWatch('orderId', form);
	const { edit } = useContext(CreateEditClaimContext);

	const { data: images, loading } = useOrderImages(!edit ? orderId : undefined);

	useEffect(() => {
		if (!edit) {
			form.setFieldsValue({
				claimImages: images?.map((image) => ({
					...image,
					id: undefined,
					imageId: image.id,
					uid: nanoid(),
					status: 'done'
				}))
			});
		}
	}, [images, form, edit]);

	return loading ? <Spin /> : <>{children}</>;
};
