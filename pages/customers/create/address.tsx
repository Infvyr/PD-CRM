import CustomHead from '../../../components/Head';
import { AddressForm } from '../../../modules/addresses/components';

function CreateAddressPage() {
	return (
		<>
			<CustomHead title="Create new address" />
			<AddressForm />
		</>
	);
}

export default CreateAddressPage;
