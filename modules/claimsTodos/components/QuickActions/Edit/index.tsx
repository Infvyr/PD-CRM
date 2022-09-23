import { ClaimTodo } from '@proovia-crm/crm-api-types';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { StyledButton } from './Edit.styles';
import { EditOutlined } from '@ant-design/icons';

type Props = {
	data: ClaimTodo[];
	record: ClaimTodo;
};

export const Edit: FC<Props> = ({ data, record }): JSX.Element => {
	const router = useRouter();

	const handleEditRecord = () => {
		return data.filter((item) => {
			if (item.id === record.id) {
				return router.push(`/claims/todos/edit/${item.id}`);
			}
			return;
		});
	};

	return (
		<>
			<StyledButton
				type="link"
				icon={<EditOutlined />}
				onClick={handleEditRecord}
			>
				Edit
			</StyledButton>
		</>
	);
};
