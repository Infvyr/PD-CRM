import CustomHead from '../../../components/Head';
import { OrderForm } from '../../../modules/orders/components';

function CreateOrderPage() {
	return (
		<>
			<CustomHead title="Create new order" />
			<OrderForm />
		</>
	);
}

export default CreateOrderPage;
