import { Permission } from '@proovia-crm/crm-api-types';
import { List } from 'antd';
import { FC, useMemo } from 'react';
import PermissionsListItem from './PermissionsListItem';
import { getPermissionsGroupBySubject } from '../../../permissions/utils/groupBySubject';

type Props = {
	permissions?: Permission[];
};

const PermissionsList: FC<Props> = ({ permissions }) => {
	const permissionsGroupedBySubject = useMemo(
		() => getPermissionsGroupBySubject(permissions),
		[permissions]
	);

	return (
		<List
			size="small"
			dataSource={Object.keys(permissionsGroupedBySubject)}
			renderItem={(subject) => (
				<PermissionsListItem
					subject={subject}
					permissions={permissionsGroupedBySubject[subject]}
				/>
			)}
		/>
	);
};

export default PermissionsList;
