import { FC } from 'react';
import { Col, Row } from 'antd';

export const DashboardFooter: FC = (): JSX.Element => (
	<footer style={{background: 'grey'}}>
		<Row>
			<Col>
        Menu here
      </Col>
		</Row>
    <Row>
      <Col>
        Copyright here
      </Col>
    </Row>
	</footer>
);
