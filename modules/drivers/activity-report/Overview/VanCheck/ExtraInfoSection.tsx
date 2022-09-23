import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import {
	CornersCondition,
	FuelLevel,
	VanCheck
} from '@proovia-crm/crm-api-types';
import { Descriptions, Divider, Tag, Tooltip } from 'antd';
import millify from 'millify';
import { FC, Fragment } from 'react';

type Props = {
	info: VanCheck[];
};

const { Item } = Descriptions;

export const ExtraInfoSection: FC<Props> = ({ info }): JSX.Element => {
	return (
		<Descriptions
			title={<Divider orientation="left">Additional Info</Divider>}
			labelStyle={{ fontWeight: 'bold' }}
		>
			{info.map((record) => {
				const {
					corners,
					windshield,
					isCheckedEngine,
					isCheckedOil,
					isCheckedAdblue,
					isCheckedAntifreeze,
					miles,
					fuel
				} = record;

				return (
					<Fragment key={record.id}>
						<Item label="Corners">
							{corners === CornersCondition.DAMAGED ? (
								<Tag color="red">{corners}</Tag>
							) : (
								<Tag color="green">{corners}</Tag>
							)}
						</Item>
						<Item label="Windshield">
							{windshield === CornersCondition.DAMAGED ? (
								<Tag color="red">{windshield}</Tag>
							) : (
								<Tag color="green">{windshield}</Tag>
							)}
						</Item>
						<Item
							label="Checked Engine"
							contentStyle={{ alignItems: 'center' }}
						>
							{isCheckedEngine ? (
								<Tooltip title="Checked">
									<CheckCircleTwoTone twoToneColor="limegreen" />
								</Tooltip>
							) : (
								<Tooltip title="Unchecked">
									<CloseCircleTwoTone twoToneColor="red" />
								</Tooltip>
							)}
						</Item>
						<Item label="Checked Oil" contentStyle={{ alignItems: 'center' }}>
							{isCheckedOil ? (
								<Tooltip title="Checked">
									<CheckCircleTwoTone twoToneColor="limegreen" />
								</Tooltip>
							) : (
								<Tooltip title="Unchecked">
									<CloseCircleTwoTone twoToneColor="red" />
								</Tooltip>
							)}
						</Item>
						<Item
							label="Checked Adblue"
							contentStyle={{ alignItems: 'center' }}
						>
							{isCheckedAdblue ? (
								<Tooltip title="Checked">
									<CheckCircleTwoTone twoToneColor="limegreen" />
								</Tooltip>
							) : (
								<Tooltip title="Unchecked">
									<CloseCircleTwoTone twoToneColor="red" />
								</Tooltip>
							)}
						</Item>
						<Item
							label="Checked Antifreeze"
							contentStyle={{ alignItems: 'center' }}
						>
							{isCheckedAntifreeze ? (
								<Tooltip title="Checked">
									<CheckCircleTwoTone twoToneColor="limegreen" />
								</Tooltip>
							) : (
								<Tooltip title="Unchecked">
									<CloseCircleTwoTone twoToneColor="red" />
								</Tooltip>
							)}
						</Item>
						<Item label="Miles">
							{millify(miles, {
								units: ['MPH', 'MPH', 'MPH', 'MPH', 'MPH'],
								space: true
							})}
						</Item>
						<Item label="Fuel">
							<Tag
								color={
									fuel === FuelLevel.EMPTY
										? 'red'
										: fuel === FuelLevel.MEDIUM
										? 'blue'
										: fuel === FuelLevel.FULL
										? 'green'
										: 'yellow'
								}
							>
								{fuel}
							</Tag>
						</Item>
					</Fragment>
				);
			})}
		</Descriptions>
	);
};
