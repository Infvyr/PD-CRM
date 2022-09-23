import { Form, message, Row } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Container, CustomPageHeader, Submit } from '../../../../components';
import { namedComponent } from '../../../../config/dynamic-component';
import { validateMessages } from '../../../../config/Forms/validate-messages';
import CreateOrderContext from '../../../../context/CreateOrder.context';
import { CollectionDeliveryInfo, GeneralInfo, OrderItems } from '../index';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../../components'), 'ResultError')
	)
};

type Props = { edit?: boolean };

export const OrderForm: FC<Props> = ({ edit = false }) => {
	const {
		query: { orderId }
	} = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [form] = Form.useForm();
	// const { data: order, error, mutate } = useOrder();

	const onFinish = (values: any) => {
		try {
			setLoading(true);
			if (edit /*&& order?.id*/) {
				// update order API
				return message.success('Order updated successfully!');
			}
			if (!edit) {
				// create order API
				// form.resetFields();
				return message.success('Order created successfully!');
			}
		} catch (error) {
			console.error(`Create Response Error: ${error}`);
		} finally {
			setLoading(false);
			// await mutate();
		}
	};

	// if (error) return <Dynamic.ResultError />;

	return (
		<CreateOrderContext.Provider value={{ form }}>
			<CustomPageHeader
				title={edit ? `Edit Order ${orderId}` : 'New Order'}
				url="/orders"
				extra={<Submit isLoading={loading} edit={edit} form={form} />}
			/>
			<Container>
				<Form
					autoComplete="off"
					form={form}
					layout="vertical"
					name="order-form"
					onFinish={onFinish}
					validateMessages={validateMessages}
				>
					<Row gutter={24}>
						<GeneralInfo />
						<CollectionDeliveryInfo />
					</Row>

					<Row gutter={24}>
						<OrderItems />
					</Row>
				</Form>
			</Container>
		</CreateOrderContext.Provider>
	);
};
