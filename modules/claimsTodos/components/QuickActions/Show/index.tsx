import { FC, useState } from 'react';
import { Drawer } from 'antd';
import { useDrawer } from '../../../../../hooks/useDrawer';
import { PreviewTodo } from '../../Preview';
import { StyledButton } from './Show.styles';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
	record: any;
};

export const Show: FC<Props> = ({ record }: Props): JSX.Element => {
	const [data, setData] = useState<any>([]);
	const { showDrawer, onClose, isDrawerVisible } = useDrawer();

	return (
		<>
			<StyledButton
				type="link"
				icon={<EyeOutlined />}
				onClick={() => {
					setData([record]);
					showDrawer();
				}}
			>
				Show
			</StyledButton>

			<Drawer
				destroyOnClose
				title="Todo info"
				placement="right"
				onClose={onClose}
				visible={isDrawerVisible}
				width="50vw"
				className="claim-todo-drawer"
				bodyStyle={{ padding: 0 }}
			>
				<PreviewTodo {...data} />
			</Drawer>
		</>
	);
};
