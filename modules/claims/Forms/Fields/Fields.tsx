import { FC, useContext } from 'react';
import { Col, Row } from 'antd';
import { useClaim } from '../../hooks/useClaim';
import { ClaimOrderId } from './ClaimOrderId';
import { CollectionDriver } from './CollectionDriver';
import { CustomerClaimAmount } from './CustomerClaimAmount';
import { DeliveryDriver } from './DeliveryDriver';
import { PaymentType } from './PaymentType';
import { Status } from '../../../../components';
import CreateEditClaimContext from '../CreateEdit/CreateEditClaim.context';
import { SettledAmount } from './SettledAmount';
import { GuiltyDriver } from './GuiltyDriver';
import { GuiltyWarehouse } from './GuiltyWarehouse';

export const Fields: FC = (): JSX.Element => {
	const { edit } = useContext(CreateEditClaimContext);
	const { data } = useClaim();

	return (
		<Row gutter={24}>
			{(!edit || (edit && data)) && (
				<>
					<Col xs={24} sm={12} xxl={7}>
						<ClaimOrderId />
						<Status />
						<PaymentType />
					</Col>
					<Col xs={24} sm={12} xxl={7}>
						<CollectionDriver />
						<DeliveryDriver />
						<GuiltyDriver />
					</Col>
					<Col xs={24} sm={12} xxl={7}>
						<CustomerClaimAmount />
						<SettledAmount />
						<GuiltyWarehouse />
					</Col>
				</>
			)}
		</Row>
	);
};
