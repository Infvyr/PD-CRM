import CustomHead from '../../../../components/Head';
import { CustomerForm } from '../../../../modules/customers/components';

function EditCustomerPage() {
	return (
		<>
			<CustomHead title="Edit customer" />
			<CustomerForm edit={true} />
		</>
	);
}

export default EditCustomerPage;
