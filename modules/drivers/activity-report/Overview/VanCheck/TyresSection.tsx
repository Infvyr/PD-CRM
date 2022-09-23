import { TireCondition, VanTires } from '@proovia-crm/crm-api-types';
import { Descriptions, Divider, Tag } from 'antd';
import { FC } from 'react';

type Props = {
	tyres: VanTires;
};

const { Item } = Descriptions;

export const TyresSection: FC<Props> = ({ tyres }): JSX.Element => {
	const records = [
		{ label: 'Left Front', tyre: tyres.leftFront },
		{ label: 'Right Front', tyre: tyres.rightFront },
		{ label: 'Left Back', tyre: tyres.leftBack },
		{ label: 'Right Back', tyre: tyres.rightBack }
	];

	return (
		<Descriptions
			title={<Divider orientation="left">Tyres Info</Divider>}
			labelStyle={{ fontWeight: 'bold' }}
		>
			{records.map(({ label, tyre }, id) => (
				<Item label={label} key={id}>
					{tyre === TireCondition.BAD && <Tag color="red">{tyre}</Tag>}
					{tyre === TireCondition.MEDIUM && <Tag color="blue">{tyre}</Tag>}
					{tyre === TireCondition.NEW && <Tag color="green">{tyre}</Tag>}
				</Item>
			))}
		</Descriptions>
	);
};
