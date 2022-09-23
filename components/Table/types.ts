import { ColumnType } from 'antd/lib/table';
import { ReactNode } from 'react';

export interface ColumnCustomFilterProps<RecordType> {
	column: CustomColumnType<RecordType>;
}
export interface CustomColumnType<RecordType> extends ColumnType<RecordType> {
	customFilter?: (props: ColumnCustomFilterProps<RecordType>) => ReactNode;
}

export interface CustomColumnGroupType<RecordType>
	extends Omit<CustomColumnType<RecordType>, 'dataIndex'> {
	children: CustomColumnType<RecordType>;
}

export declare type CustomColumnsType<RecordType = unknown> = (
	| CustomColumnGroupType<RecordType>
	| CustomColumnType<RecordType>
)[];
