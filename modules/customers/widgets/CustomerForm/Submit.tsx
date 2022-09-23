import { Button, Form, Space } from 'antd';
import { FC } from 'react';
import { hasRequiredFields } from '../../../../utils/form.helpers';
import { StyledSubmit } from './StyledSubmit.styles';

type Props = {
	formRequiredFields: string[];
	loading?: boolean;
};

export const Submit: FC<Props> = ({ formRequiredFields, loading }) => (
	<StyledSubmit>
		<Form.Item noStyle>
			<Space>
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
					disabled={hasRequiredFields(formRequiredFields)}
				>
					Submit
				</Button>
				<Button htmlType="reset">Reset</Button>
			</Space>
		</Form.Item>
	</StyledSubmit>
);
