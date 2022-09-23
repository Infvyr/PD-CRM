import { FilterOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { ComponentPropsWithRef, FC } from 'react';

type FilterButtonProps = {
	text?: string;
	filterCount?: number;
} & ComponentPropsWithRef<typeof Button>;

export const FilterButton: FC<FilterButtonProps> = ({
	filterCount = 0,
	text,
	...rest
}) => {
	return (
		<Badge count={filterCount}>
			<Button type="primary" icon={<FilterOutlined />} {...rest}>
				{text}
			</Button>
		</Badge>
	);
};
