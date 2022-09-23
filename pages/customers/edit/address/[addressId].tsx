import CustomHead from '../../../../components/Head';
import { AddressForm } from '../../../../modules/addresses/components';

function EditCustomerPage() {
	return (
		<>
			<CustomHead title="Edit address" />
			<AddressForm edit={true} />
		</>
	);
}

export default EditCustomerPage;
