import { ZohoOrder } from '@proovia-crm/crm-api-types';
import { Form, Modal, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { FC, useCallback, useState } from 'react';
import { ZohoApi } from '../../../../api/zoho.api';

interface Values {
	currentOrder: number;
	warehouse: string;
}

type AssignOrderProps = {
	currentOrder: number;
	visible: boolean;
	onCreate: (values: Values) => void;
	onCancel: () => void;
};

export const AssignOrderForm: FC<AssignOrderProps> = ({
	currentOrder,
	visible,
	onCreate,
	onCancel
}): JSX.Element => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState<ZohoOrder | null>(null);

	const handleSearch = useCallback(async (value: string) => {
		if (value) {
			try {
				const zohoApi = new ZohoApi();
				setLoading(true);
				const { data: zohoOrder } = await zohoApi.findOrder({ orderId: value });
				setOrder(zohoOrder);
			} catch (err) {
				setOrder(null);
			} finally {
				setLoading(false);
			}
		}
	}, []);

	const handleOnSelect = useCallback(() => {
		form?.setFieldsValue({ orderPaid: order?.orderPaid });
	}, [form, order]);

	const onOk = () =>
		form.validateFields().then((values) => {
			onCreate(values);
			form.resetFields();
		});

	return (
		<Modal
			destroyOnClose
			visible={visible}
			title="Assign Order to Location"
			okText="Assign"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={onOk}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					name="currentOrder"
					label="Current Order"
					rules={[{ required: true, message: 'Select the current order!' }]}
				>
					<Select
						showSearch
						allowClear
						optionFilterProp="children"
						placeholder="Select an order or type to search it"
						onSearch={debounce(handleSearch, 300)}
						notFoundContent={loading ? <Spin size="small" /> : null}
						onSelect={handleOnSelect}
					>
						{order && (
							<Select.Option key={order.id} value={order.id}>
								{order.id}
							</Select.Option>
						)}
					</Select>
				</Form.Item>
				<Form.Item
					name="warehouse"
					label="Warehouse Location"
					rules={[
						{ required: true, message: 'Select the warehouse location!' }
					]}
				>
					<Select placeholder="A03 Birmingham">
						<Select.Option key="1" value="A01">
							A01 Birmingham
						</Select.Option>
						<Select.Option key="2" value="A02">
							A02 Birmingham
						</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
