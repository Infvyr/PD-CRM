import { ColumnFilterItem } from 'antd/lib/table/interface';
import { useProfiles } from '../../profiles/hooks/useProfiles';

export const useProfileFilterConfig = () => {
	const { data: profiles } = useProfiles();
	return (profiles?.data || []).map<ColumnFilterItem>((profile) => ({
		text: profile.name,
		value: profile.id
	}));
};
