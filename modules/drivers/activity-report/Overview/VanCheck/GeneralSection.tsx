import { VanCheck } from '@proovia-crm/crm-api-types';
import { Descriptions, Divider } from 'antd';
import moment from 'moment';
import { FC, Fragment } from 'react';
import { DATE_TIME_FORMAT } from '../../../../../config/date-format';

type Props = {
	info: VanCheck[];
};
const { Item } = Descriptions;

export const GeneralSection: FC<Props> = ({ info }): JSX.Element => {
	return (
		<Descriptions
			title={<Divider orientation="left">General Info</Divider>}
			labelStyle={{ fontWeight: 'bold' }}
		>
			{info.map(({ createdAt, updatedAt }) => {
				return (
					<Fragment key="general">
						<Item label="Created At">
							{moment(createdAt).format(DATE_TIME_FORMAT)}
						</Item>
						<Item label="Updated At">
							{moment(updatedAt).format(DATE_TIME_FORMAT)}
						</Item>
					</Fragment>
				);
			})}
		</Descriptions>
	);
};
