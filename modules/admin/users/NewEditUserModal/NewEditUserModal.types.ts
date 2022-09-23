import { CreateUser } from '@proovia-crm/crm-api-types';

export interface CreateUserValues extends Omit<CreateUser, 'name'> {
	firstName: string;
	lastName: string;
}
