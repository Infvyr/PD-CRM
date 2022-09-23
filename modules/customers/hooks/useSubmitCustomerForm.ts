import { CreateCustomer } from '@proovia-crm/crm-api-types';
import { Form, message } from 'antd';
import { useState } from 'react';
import { CustomersApi } from '../../../api/customers.api';
import { showError } from '../../../utils/message.helper';

export const useSubmitCustomerForm = (edit?: boolean, id?: number) => {
	const customerApi = new CustomersApi();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const formRequiredFields = [
		Form.useWatch('name', form),
		Form.useWatch('email', form),
		Form.useWatch('address', form),
		Form.useWatch('paymentType', form)
	];

	const onFinish = async (values: CreateCustomer) => {
		const newCustomer = {
			zohoId: '1', // temporary solution
			name: values.name?.trim(),
			// dateTC: values.dateTC,
			email: values.email?.trim(),
			phone: values.phone?.trim(),
			mobile: values.mobile?.trim(),
			address: values.address?.trim(),
			paymentType: values.paymentType,
			paymentTerms: values.paymentTerms ?? ''
		};

		try {
			setLoading(true);
			if (edit) {
				if (id) {
					await customerApi.updateCustomer(id, newCustomer);
					return message.success('Customer successfully updated!');
				}
			} else {
				const response = await customerApi.createCustomer(newCustomer);

				if (response.status === 201) {
					message.success('A new customer successfully created!');
					form.resetFields();
				}
			}
		} catch (error) {
			console.error(error);
			showError(error);
		} finally {
			setLoading(false);
		}
	};

	return { onFinish, loading, form, formRequiredFields };
};
