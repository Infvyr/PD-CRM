import { CreateAddress } from '@proovia-crm/crm-api-types';
import { Form, message } from 'antd';
import { useState } from 'react';
import { AddressesApi } from '../../../api/addresses.api';
import { showError } from '../../../utils/message.helper';

export const useSubmitAddressForm = (edit?: boolean, id?: number) => {
	const addressApi = new AddressesApi();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const formRequiredFields = [
		Form.useWatch('email', form),
		Form.useWatch('postcode', form)
		// Form.useWatch('latitude', form),
		// Form.useWatch('longitude', form)
	];

	const onFinish = async (values: CreateAddress) => {
		const newAddress = {
			contactName: values.contactName?.trim(),
			email: values.email?.trim(),
			houseName: values.houseName?.trim(),
			line1: values.line1?.trim(),
			line2: values.line2?.trim(),
			line3: values.line3?.trim(),
			line4: values.line4?.trim(),
			line5: values.line5?.trim(),
			postcode: values.postcode?.trim(),
			customer: values.customer,
			latitude: values.latitude,
			longitude: values.longitude,
			mobile: values.mobile?.trim(),
			postTown: values.postTown?.trim(),
			whichTown: values.whichDays,
			workingHours: values.workingHours
		};

		try {
			setLoading(true);
			if (edit) {
				if (id) {
					await addressApi.updateAddress(id, newAddress);
					return message.success('Address successfully updated!');
				}
			} else {
				const response = await addressApi.createAddress(newAddress);
				if (response.status === 201) {
					message.success('A new address successfully created!');
					form.resetFields();
				}
			}
		} catch (error) {
			showError(error);
		} finally {
			setLoading(false);
		}
	};

	return { onFinish, loading, form, formRequiredFields };
};
