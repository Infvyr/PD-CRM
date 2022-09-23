import dynamic from 'next/dynamic';
import CustomHead from '../../../../components/Head';
import { namedComponent } from '../../../../config/dynamic-component';

const Dynamic = {
	CreateEdit: dynamic(() =>
		namedComponent(
			import('../../../../modules/claimsTodos/components/Forms/CreateEdit'),
			'CreateEdit'
		)
	)
};

function EditTodoPage() {
	return (
		<>
			<CustomHead title="Edit todo" />
			<Dynamic.CreateEdit edit={true} />
		</>
	);
}

export default EditTodoPage;
