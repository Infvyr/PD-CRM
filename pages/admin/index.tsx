import { useRouter } from 'next/router';
import { CustomPageHeader } from '../../components';
import CustomHead from '../../components/Head';
import { withAdminLayout } from '../../modules/admin/HOC/withAdminLayout';

function Setup() {
	const router = useRouter();
	const hash = router.asPath;

	return (
		<>
			<CustomHead title="Setup" />
			<CustomPageHeader
				backIcon={false}
				title="Users"
				style={{ left: '302px' }}
			/>
			<div>Content {hash}</div>
		</>
	);
}

export default withAdminLayout(Setup);
