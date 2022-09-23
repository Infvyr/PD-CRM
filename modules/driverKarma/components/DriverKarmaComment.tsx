import { Form, Input } from 'antd';
import { FC } from 'react';

export const DriverKarmaComment: FC = (): JSX.Element => (
	<Form.Item name="comments" label="Comment" style={{ marginBottom: 0 }}>
		<Input.TextArea autoSize={{ minRows: 5 }} />
	</Form.Item>
);
