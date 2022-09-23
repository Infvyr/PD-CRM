import { ClaimTodo } from '@proovia-crm/crm-api-types';
import { FC, Fragment } from 'react';
import { Descriptions } from 'antd';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../config/date-format';
import { StyledDescription } from './Preview.styles';
import moment from 'moment';

const { Item } = Descriptions;

export const PreviewTodo: FC<ClaimTodo> = (todos): JSX.Element => {
	const todosArray = Object.values(todos);

	return (
		<StyledDescription bordered size="middle">
			{todosArray.map((todo: ClaimTodo, index: number) => (
				<Fragment key={index}>
					<Item label="Order">{todo.order}</Item>
					<Item label="Task">{todo.task}</Item>
					<Item label="Due Date">
						{moment(todo.dueDate).format(DATE_FORMAT)}
					</Item>
					<Item label="Created By">{todo.createdBy}</Item>
					<Item label="Created At">
						{moment(todo.createdAt).format(DATE_TIME_FORMAT)}
					</Item>
					{todo.completedBy && (
						<Item label="Completed By">{todo.completedBy}</Item>
					)}

					{todo.completedAt && (
						<Item label="Completed At">
							{moment(todo.completedAt).format(DATE_TIME_FORMAT)}
						</Item>
					)}
				</Fragment>
			))}
		</StyledDescription>
	);
};
