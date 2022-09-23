import { ZohoTaskType } from '@proovia-crm/crm-api-types';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { Col, Descriptions, Form, Row } from 'antd';
import { Spinner } from '../../../../../components';
import { DATE_TIME_FORMAT } from '../../../../../config/date-format';
import { namedComponent } from '../../../../../config/dynamic-component';
import { useZohoOrders } from '../../../../zoho/hooks/useZohoOrders';
import CreateEditClaimContext from '../../CreateEdit/CreateEditClaim.context';
import { StyledAlignment } from 'apps/crm-app/styles';
import { ArrivalNotesStyles } from './ArrivalNotes.styles';

const Dynamic = {
	ResultError: dynamic(() =>
		namedComponent(import('../../../../../components'), 'ResultError')
	),
	EmptyData: dynamic(() =>
		namedComponent(import('../../../../../components'), 'EmptyData')
	)
};

export const ArrivalNotes: FC = (): JSX.Element => {
	const { edit } = useContext(CreateEditClaimContext);
	const form = Form.useFormInstance();
	const orderId = Form.useWatch('orderId', form);
	const {
		data: order,
		error,
		loading
	} = useZohoOrders({
		orderId
	});
	const orderTasks = order?.tasks;
	const orderLink = order?.orderLink;
	const orderDescription = order?.orderDescription;

	const collectionTask = orderTasks?.find(
		(task) => task.type === ZohoTaskType.COLLECTION
	);
	const deliveryTask = orderTasks?.find(
		(task) => task.type === ZohoTaskType.DELIVERY
	);

	if (error) {
		return <Dynamic.ResultError error={error} style={{ height: '100%' }} />;
	}

	if (edit && loading) {
		return (
			<StyledAlignment style={{ height: '100%' }}>
				{orderId === undefined ? (
					<Dynamic.EmptyData style={{ height: '100%' }} />
				) : (
					<Spinner />
				)}
			</StyledAlignment>
		);
	}

	return (
		<>
			<style>{ArrivalNotesStyles}</style>

			{
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<h2 style={{ marginBottom: 0 }}>Overview</h2>
					</Col>
					<Col xs={24}>
						<Descriptions
							size="small"
							column={1}
							bordered
							labelStyle={{ width: '110px', verticalAlign: 'baseline' }}
						>
							<Descriptions.Item label="Order Link">
								{orderLink ? (
									<a
										href={orderLink}
										title={orderLink}
										target="_blank"
										rel="noopener noreferrer nofollow"
									>
										{orderLink}
									</a>
								) : (
									'-'
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Order Description">
								{orderDescription ?? '-'}
							</Descriptions.Item>
						</Descriptions>
					</Col>
					<Col xs={24}>
						<Descriptions
							title="Collection Info"
							size="small"
							column={1}
							bordered
							labelStyle={{ width: '110px', verticalAlign: 'baseline' }}
						>
							<Descriptions.Item label="Arrival Time">
								{collectionTask?.arrivalTime
									? moment(collectionTask.arrivalTime).format(DATE_TIME_FORMAT)
									: '-'}
							</Descriptions.Item>
							<Descriptions.Item label="Notes for office">
								<span style={{ whiteSpace: 'pre-wrap' }}>
									{collectionTask?.notes ?? '-'}
								</span>
							</Descriptions.Item>
						</Descriptions>
					</Col>
					<Col xs={24}>
						<Descriptions
							title="Delivery Info"
							size="small"
							column={1}
							labelStyle={{ width: '110px', verticalAlign: 'baseline' }}
							bordered
						>
							<Descriptions.Item label="Arrival Time">
								{deliveryTask?.arrivalTime
									? moment(deliveryTask.arrivalTime).format(DATE_TIME_FORMAT)
									: '-'}
							</Descriptions.Item>
							<Descriptions.Item label="Notes for office">
								<span style={{ whiteSpace: 'pre-wrap' }}>
									{deliveryTask?.notes ?? '-'}
								</span>
							</Descriptions.Item>
						</Descriptions>
					</Col>
				</Row>
			}
		</>
	);
};
