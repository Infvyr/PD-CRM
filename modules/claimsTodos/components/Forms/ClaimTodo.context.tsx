import { UpdateClaimTodo } from '@proovia-crm/crm-api-types';
import { FormInstance } from 'antd';
import { createContext } from 'react';

export interface CreateEditClaimTodoContext {
	edit: boolean;
	form?: FormInstance<UpdateClaimTodo>;
}

const ClaimTodoContext = createContext<CreateEditClaimTodoContext>({
	edit: false
});

if (process.env.NODE_ENV !== 'production') {
	ClaimTodoContext.displayName = 'ClaimTodoContext';
}

export default ClaimTodoContext;
