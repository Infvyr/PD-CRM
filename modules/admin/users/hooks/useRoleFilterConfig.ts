import { ColumnFilterItem } from 'antd/lib/table/interface';
import { useRoles } from '../../roles/hooks/useRoles';

export const useRolesFilterConfig = () => {
	const { data: roles } = useRoles();
	return (roles?.data || []).map<ColumnFilterItem>((role) => ({
		text: role.name,
		value: role.id
	}));
};
