import { FC } from 'react';
import { Divider } from 'antd';
import { ClaimNotesTable } from './ClaimNotesTable';
import FormItem from 'antd/lib/form/FormItem';

export const ClaimNotes: FC = (): JSX.Element => {
	return (
		<>
			<Divider orientation="left">
				<b>Notes</b>
			</Divider>
			<FormItem name="claimNotes" valuePropName="notes">
				<ClaimNotesTable />
			</FormItem>
		</>
	);
};
