import { TablePaginationConfig } from 'antd';

const handleShowTotal = (total: number, range: number[]) =>
	`${range[0]}-${range[1]} of ${total} items`;

export const pagination: TablePaginationConfig = {
	showTotal: handleShowTotal,
	showTitle: false,
	showQuickJumper: true
};
