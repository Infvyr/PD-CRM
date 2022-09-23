import styled from 'styled-components';
import ProfileSelect from '../../../profiles/ProfileSelect';
import RoleSelect from '../../../roles/RoleSelect';

export const StyledRoleSelect = styled(RoleSelect)`
	&& .ant-select-selector {
		padding-left: 0;
		.ant-select-selection-search {
			left: 0;
		}
	}
`;

export const StyledProfileSelect = styled(ProfileSelect)`
	&& .ant-select-selector {
		padding-left: 0;
		.ant-select-selection-search {
			left: 0;
		}
	}
`;
