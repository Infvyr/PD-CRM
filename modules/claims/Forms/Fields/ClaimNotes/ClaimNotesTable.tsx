import { ClaimNoteRowData } from '@proovia-crm/crm-api-types';
import { ConfigProvider, Button, Popconfirm, Input, Table } from 'antd';
import { ChangeEvent, FC } from 'react';
import { TableWrapper } from './ClaimNotes.styles';
import useAuth from '../../../../../hooks/useAuth';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../../config/date-format';
import FormItem from 'antd/lib/form/FormItem';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { debounce } from 'lodash';

interface Props {
	notes?: ClaimNoteRowData[];
	onChange?: (notes: ClaimNoteRowData[]) => void;
}

export const ClaimNotesTable: FC<Props> = ({ notes = [], onChange }) => {
	const { user } = useAuth();

	const handleOnAddNote = () => {
		onChange?.([...notes, { key: nanoid(), note: '' }]);
	};

	const handleOnDelete = (record: ClaimNoteRowData) => {
		const newData = notes.filter((element) => element.key !== record.key);
		onChange?.(newData);
	};

	const handleOnNoteChange = debounce(
		(e: ChangeEvent<HTMLTextAreaElement>, claimNote: ClaimNoteRowData) => {
			claimNote.note = e.target.value;
			onChange?.([...notes]);
		},
		300
	);

	const columns: ColumnsType<ClaimNoteRowData> = [
		{
			key: 'index',
			title: '#',
			width: 57,
			render: (value, record, index) => (
				<>
					<Popconfirm
						title="Delete?"
						onConfirm={() => handleOnDelete(record)}
						okText="Yes"
						cancelText="No"
						placement="topLeft"
					>
						<DeleteOutlined className="delete-claim-note" />
					</Popconfirm>
					<span className="note-index">{index + 1}</span>
				</>
			)
		},
		{
			key: 'createdBy',
			title: 'User',
			width: 130,
			dataIndex: ['createdByUser'],
			render: (value) => value ?? user?.name
		},
		{
			key: 'createdAt',
			title: 'Datetime',
			width: 180,
			dataIndex: 'createdAt',
			render: (value) =>
				value
					? moment(value).format(DATE_TIME_FORMAT)
					: moment(Date.now()).format(DATE_TIME_FORMAT)
		},
		{
			key: 'note',
			title: 'Notes',
			dataIndex: 'note',
			width: 400,
			render: (value, record, index) => (
				<>
					<FormItem
						name={['claimNotes', index, 'note']}
						style={{ marginBottom: 0 }}
						rules={[
							{
								required: true,
								message: 'Please provide notes or delete this record'
							}
						]}
					>
						<Input.TextArea
							autoSize={{ minRows: 4, maxRows: 6 }}
							onChange={(e) => handleOnNoteChange(e, record)}
						/>
					</FormItem>
				</>
			)
		}
	];

	return (
		<ConfigProvider renderEmpty={() => null}>
			<TableWrapper>
				<Table
					columns={columns}
					dataSource={notes}
					pagination={false}
					rowKey={(record) => record.key}
					footer={() => (
						<Button
							type="dashed"
							onClick={handleOnAddNote}
							icon={<PlusOutlined />}
						>
							<span>Add Notes</span>
						</Button>
					)}
				/>
			</TableWrapper>
		</ConfigProvider>
	);
};
