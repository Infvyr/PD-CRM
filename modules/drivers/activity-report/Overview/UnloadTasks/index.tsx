import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { Spinner } from '../../../../../components';
import CustomHead from '../../../../../components/Head';
import { namedComponent } from '../../../../../config/dynamic-component';
import DriverActivityContext from '../../../context/DriverActivity.context';

const Dynamic = {
	AllTasks: dynamic(() => namedComponent(import('./AllTasks'), 'AllTasks'), {
		ssr: false
	}),
	Stats: dynamic(() => namedComponent(import('./Stats'), 'Stats'), {
		loading: () => <Spinner />
	})
};

export const UnloadTasks: FC = (): JSX.Element => {
	const { selectedDate } = useContext(DriverActivityContext);

	return (
		<>
			<CustomHead title="Driver unload tasks" />
			{selectedDate && (
				<>
					<Row gutter={[24, 24]}>
						<Col span={24}>
							<Dynamic.Stats />
						</Col>
					</Row>

					<div style={{ height: '1rem' }} />

					<Row gutter={[24, 24]}>
						<Col xs={24}>
							<Dynamic.AllTasks />
						</Col>
					</Row>
				</>
			)}
		</>
	);
};
