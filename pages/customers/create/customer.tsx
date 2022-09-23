import CustomHead from '../../../components/Head';
import { CustomerForm } from '../../../modules/customers/components';

function CreateCustomerPage() {
	return (
		<>
			<CustomHead title="Create new customer" />
			<CustomerForm />
		</>
	);
}

export default CreateCustomerPage;
