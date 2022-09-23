import { Button, Collapse, Drawer, DrawerProps, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Paginated } from 'nestjs-paginate';
import { useEffect, useState, useMemo } from 'react';
import { CustomColumnsType } from '../types';

const { Panel } = Collapse;

interface FilterDrawerProps<T> extends DrawerProps {
	meta?: Paginated<T>['meta'];
	columns?: CustomColumnsType<T>;
	onSearch?: (value: Record<string, string | number> | undefined) => void;
}

const FilterDrawer = <T,>(props: FilterDrawerProps<T>) => {
	const [collapseKey, setCollapseKey] = useState(1);
	const { columns, onSearch, meta, ...rest } = props;
	const [form] = useForm();

	const handleOnFinish = (
		values: Record<string, string | number> | undefined
	) => {
		onSearch?.(values);
	};

	const defaultActiveKeys = useMemo(
		() => Object.keys(meta?.filter || {}),
		[meta?.filter]
	);

	useEffect(() => {
		if (!defaultActiveKeys.length) {
			setCollapseKey((prev) => prev + 1);
		}
	}, [defaultActiveKeys]);

	return (
		<Drawer
			title="Filters"
			placement="right"
			width={350}
			bodyStyle={{ padding: 0 }}
			style={{ marginTop: 'var(--header-height)' }}
			extra={
				<Button type="primary" htmlType="submit" danger onClick={form.submit}>
					Search
				</Button>
			}
			{...rest}
		>
			<Form form={form} onFinish={handleOnFinish}>
				<Collapse
					key={collapseKey}
					expandIconPosition="right"
					defaultActiveKey={defaultActiveKeys}
				>
					{columns?.map(
						(column) =>
							column.key &&
							column.customFilter && (
								<Panel header={column.title} key={column.key}>
									{column.customFilter({ column })}
								</Panel>
							)
					)}
				</Collapse>
			</Form>
		</Drawer>
	);
};

export default FilterDrawer;
