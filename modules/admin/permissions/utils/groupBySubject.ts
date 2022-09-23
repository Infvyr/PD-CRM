import { Permission } from '@proovia-crm/crm-api-types';

export const getPermissionsGroupBySubject = (
	permissions: Permission[] | undefined
) => {
	const response: { [key: string]: Permission[] } = {};
	permissions?.forEach((permission) => {
		response[permission.subject] = [
			...(response[permission.subject] || []),
			permission
		];
	});
	return response;
};

export const getPermissionsIdsGroupedBySubject = (
	permissions: Permission[] | undefined
) => {
	const response: { [key: string]: number[] } = {};
	permissions?.forEach((permission) => {
		response[permission.subject] = [
			...(response[permission.subject] || []),
			permission.id
		];
	});
	return response;
};
