import { Col, Divider, Row } from 'antd';
import { FC, memo } from 'react';
import { AddressPostcode, AddressPostcodeEdit } from '..';

const AddressInfo: FC<{ edit: boolean }> = ({ edit }): JSX.Element => (
	<Col xs={24} lg={12} xl={16}>
		<Row>
			<Col xs={24}>
				<Divider orientation="left">Address Information</Divider>
			</Col>
		</Row>

		{edit ? <AddressPostcodeEdit /> : <AddressPostcode />}
	</Col>
);

export default memo(AddressInfo);
