import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { VanTools } from '@proovia-crm/crm-api-types';
import { Descriptions, Divider, Tooltip } from 'antd';
import { FC } from 'react';

type Props = {
	tools: VanTools;
};
const { Item } = Descriptions;

export const ToolsSection: FC<Props> = ({ tools }): JSX.Element => {
	return (
		<Descriptions
			title={<Divider orientation="left">Tools Info</Divider>}
			labelStyle={{ fontWeight: 'bold' }}
		>
			<Item label="Ramp" contentStyle={{ alignItems: 'center' }}>
				{tools?.ramp && (
					<Tooltip title="Checked">
						<CheckCircleTwoTone twoToneColor="limegreen" />
					</Tooltip>
				)}
				{tools?.ramp === false && (
					<Tooltip title="Unchecked">
						<CloseCircleTwoTone twoToneColor="red" />
					</Tooltip>
				)}
			</Item>
			<Item label="Trolley" contentStyle={{ alignItems: 'center' }}>
				{tools?.trolley && (
					<Tooltip title="Checked">
						<CheckCircleTwoTone twoToneColor="limegreen" />
					</Tooltip>
				)}
				{tools?.trolley === false && (
					<Tooltip title="Unchecked">
						<CloseCircleTwoTone twoToneColor="red" />
					</Tooltip>
				)}
			</Item>
			<Item label="Blankets">{tools?.blankets}</Item>
			<Item label="Straps">{tools?.straps}</Item>
			<Item label="Spare Wheel" contentStyle={{ alignItems: 'center' }}>
				{tools?.spareWheel && (
					<Tooltip title="Checked">
						<CheckCircleTwoTone twoToneColor="limegreen" />
					</Tooltip>
				)}
				{tools?.spareWheel === false && (
					<Tooltip title="Unchecked">
						<CloseCircleTwoTone twoToneColor="red" />
					</Tooltip>
				)}
			</Item>
		</Descriptions>
	);
};
