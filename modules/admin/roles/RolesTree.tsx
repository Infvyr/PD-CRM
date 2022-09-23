import { Tree } from 'antd';
import { ResultError } from '../../../components';
import { Spinner } from '../../../components/Spinner/index';
import { useRolesTree } from './hooks/useRolesTree';

export function RolesTree() {
	const { data: rolesTree, loading, error } = useRolesTree();

	if (loading) return <Spinner />;
	if (error) return <ResultError />;

	return (
		<Tree
			showLine={{ showLeafIcon: false }}
			showIcon={false}
			treeData={rolesTree}
			defaultExpandAll={true}
		/>
	);
}
