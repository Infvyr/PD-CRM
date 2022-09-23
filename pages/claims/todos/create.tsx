import dynamic from 'next/dynamic';
import CustomHead from '../../../components/Head';
import { namedComponent } from '../../../config/dynamic-component';

const Dynamic = {
	CreateEdit: dynamic(() =>
		namedComponent(
			import('../../../modules/claimsTodos/components/Forms/CreateEdit'),
			'CreateEdit'
		)
	)
};

function CreateTodo() {
	return (
		<>
			<CustomHead title="Create new todo" />
			<Dynamic.CreateEdit />
		</>
	);
}

export default CreateTodo;
