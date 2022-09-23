import { ImageType } from '@proovia-crm/crm-api-types';
import { Col, Divider, Row, Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { EmptyData, ResultError } from '../../../../../components';
import { namedComponent } from '../../../../../config/dynamic-component';
import DriverActivityContext from '../../../context/DriverActivity.context';
import { useDriverVanCheck } from '../../../hooks/useDrivers';

const Dynamic = {
	GeneralSection: dynamic(
		() => namedComponent(import('./GeneralSection'), 'GeneralSection'),
		{
			loading: () => <Skeleton />
		}
	),
	Images: dynamic(() => namedComponent(import('../Images'), 'Images'), {
		ssr: false
	}),
	ExtraInfoSection: dynamic(
		() => namedComponent(import('./ExtraInfoSection'), 'ExtraInfoSection'),
		{ loading: () => <Skeleton /> }
	),
	ToolsSection: dynamic(
		() => namedComponent(import('./ToolsSection'), 'ToolsSection'),
		{
			loading: () => <Skeleton />
		}
	),
	TyresSection: dynamic(
		() => namedComponent(import('./TyresSection'), 'TyresSection'),
		{ loading: () => <Skeleton /> }
	),
	ResultError: dynamic(
		() => namedComponent(import('../../../../../components'), 'ResultError'),
		{ loading: () => <Skeleton /> }
	)
};

export const VanCheck: FC = (): JSX.Element => {
	const { id, selectedDate } = useContext(DriverActivityContext);
	const { data: vanChecks, error } = useDriverVanCheck(id, selectedDate);
	const driverInfo = vanChecks?.data || [];
	const vanTools = vanChecks?.data[0]?.tools;
	const vanTyres = vanChecks?.data[0]?.tires;
	const vanCheckImages = vanChecks?.data[0]?.images || [];

	const vanImages = vanCheckImages.filter(
		(value) => value.type === ImageType.VAN
	);

	if (error) return <Dynamic.ResultError error={error} />;
	if (!vanChecks?.data.length)
		return <EmptyData description="No van checks done yet!" />;

	return (
		<>
			{selectedDate && (
				<Row gutter={[24, 24]}>
					<Col xs={24}>
						<Dynamic.GeneralSection info={driverInfo} />
						<Dynamic.TyresSection tyres={vanTyres!} />
						<Dynamic.ToolsSection tools={vanTools!} />
						<Dynamic.ExtraInfoSection info={driverInfo} />
					</Col>
					<Col xs={24}>
						<Divider orientation="left">Van Images</Divider>
						<Dynamic.Images images={vanImages} />
					</Col>
				</Row>
			)}
		</>
	);
};
