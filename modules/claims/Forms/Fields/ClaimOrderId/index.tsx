import { ZohoOrder } from '@proovia-crm/crm-api-types';
import { Button, message, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { FC, useCallback, useContext, useState } from 'react';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';
import { StyledFormItem, StyledSpace } from '../../styles/create.styles';
import { ZohoApi } from '../../../../../api/zoho.api';
import { CopyOutlined } from '@ant-design/icons';

const { Option } = Select;

export const ClaimOrderId: FC = (): JSX.Element => {
	const [order, setOrder] = useState<ZohoOrder | null>(null);
	const [loading, setLoading] = useState(false);
	const { form, edit } = useContext(CreateEditClaimContext);

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

	const copySelectedOption = useCallback(async () => {
		const antSelectItem = document.querySelector(
			'.custom-order-number .ant-select-selection-item'
		);
		const number =
			antSelectItem?.getAttribute('title') || antSelectItem?.textContent;

		try {
			if (number) {
				await navigator.clipboard.writeText(number);
				message.info(`Order ${number} was copied to clipboard!`);
			}
		} catch {
			message.info('Failed to copy the order number!');
		}
	}, [order]);

	return (
		<StyledSpace>
			<StyledFormItem
				className="custom-order-number"
				name="orderId"
				label="Order number"
				rules={[{ required: true, message: 'Please select an order ID!' }]}
			>
				<Select
					allowClear
					showSearch
					showArrow
					placeholder="Order number"
					optionFilterProp="children"
					notFoundContent={loading ? <Spin size="small" /> : null}
					onSearch={debounce(handleSearch, 300)}
					onSelect={handleOnSelect}
					onClear={() => setOrder(null)}
				>
					{order && (
						<Option key={order.id} value={order.id}>
							{order.id}
						</Option>
					)}
				</Select>
			</StyledFormItem>
			{!edit && !order ? (
				<div style={{ height: '32px' }} />
			) : (
				<Button icon={<CopyOutlined />} onClick={copySelectedOption} />
			)}
		</StyledSpace>
	);
};
