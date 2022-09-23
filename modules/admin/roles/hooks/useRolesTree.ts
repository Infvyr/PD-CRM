import { RolesApi } from '../../../../api/roles.api';
import useSWR from 'swr';
import { DataNode } from 'antd/lib/tree';
import { RoleTree } from '@proovia-crm/crm-api-types';

function parseRoles(roles: RoleTree[] | undefined): DataNode[] {
	return (
		roles?.map((role) => ({
			title: role.name,
			key: role.id,
			value: `${role.id}`,
			children: parseRoles(role.children)
		})) || []
	);
}

export const useRolesTree = () => {
	const rolesApi = new RolesApi();
	const { data, error, ...rest } = useSWR(`/api/v1/roles/hierarchy`, () =>
		rolesApi.getRolesTree()
	);

	const loading = !data && !error;

	const parsedRoles = parseRoles(data?.data);

	return { data: parsedRoles, loading, error, ...rest };
};
