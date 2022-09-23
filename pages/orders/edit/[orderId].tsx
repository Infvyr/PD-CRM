import CustomHead from '../../../components/Head';
import { OrderForm } from '../../../modules/orders/components';

function EditOrderPage() {
	return (
		<>
			<CustomHead title="Edit order" />
			<OrderForm edit={true} />
		</>
	);
}

export default EditOrderPage;
