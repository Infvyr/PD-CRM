import { CreateEditClaimForm } from '../../../components';
import CustomHead from '../../../components/Head';

function EditClaim() {
	return (
		<>
			<CustomHead title="Edit damage claim" />
			<CreateEditClaimForm edit={true} />
		</>
	);
}

export default EditClaim;
