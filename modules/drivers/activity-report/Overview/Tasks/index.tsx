import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Spinner } from '../../../../../components';
import CustomHead from '../../../../../components/Head';
import { namedComponent } from '../../../../../config/dynamic-component';

const Dynamic = {
	Stats: dynamic(() => namedComponent(import('./Stats'), 'Stats'), {
		loading: () => <Spinner />
	}),
	AllTasks: dynamic(() => namedComponent(import('./AllTasks'), 'AllTasks'), {
		ssr: false
	})
};

export const Tasks: FC = (): JSX.Element => {
	return (
		<>
			<CustomHead title="Driver tasks" />
			<Row gutter={[24, 24]}>
				<Col xs={24}>
					<Dynamic.Stats />
				</Col>
				<Col xs={24}>
					<Dynamic.AllTasks />
				</Col>
			</Row>
		</>
	);
};
