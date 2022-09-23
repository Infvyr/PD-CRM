import { FormInstance } from 'antd';
import { createContext } from 'react';

export interface CreateOrderContext {
	edit?: boolean;
	form?: FormInstance<CreateOrderValues>;
}

export type CreateOrderItems = any & { uid: string };
export interface CreateOrderValues extends Omit<any, 'orderItems'> {
	id: number;
	orderItems: { [key: number]: any };
}

const CreateOrderContext = createContext<CreateOrderContext>({
	edit: false
});

if (process.env.NODE_ENV !== 'production') {
	CreateOrderContext.displayName = 'CreateOrderContext';
}

export default CreateOrderContext;
