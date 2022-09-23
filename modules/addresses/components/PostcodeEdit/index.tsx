import { AutoComplete, Col, Form, Input, Row, Select } from 'antd';
import { FC } from 'react';
import { rules } from '../../../../config/Forms/rules';
import { EmptyData, SimpleInput } from '../../../../components';

const postcodes = [
	{ value: 'SW1W 0NY' },
	{ value: 'PO16 7GZ' },
	{ value: 'L1 8JQ' }
];

export const AddressPostcodeEdit: FC = (): JSX.Element => {
	return (
		<Row gutter={24}>
			<Col xs={24} lg={5}>
				<Form.Item
					label="Postcode"
					name="postcode"
					rules={rules.addressPostcode}
				>
					<AutoComplete
						allowClear
						dropdownRender={(menu) => <>{menu}</>}
						filterOption={(inputValue, option) =>
							option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
						notFoundContent={<EmptyData description="No postcode found!" />}
						options={postcodes}
						placeholder="Type or select a postcode"
					/>
				</Form.Item>

				<Form.Item label="Address" name="address">
					<Select
						showSearch
						allowClear
						notFoundContent={<EmptyData description={`No address found!`} />}
						optionFilterProp="children"
						placeholder="Type or select a address"
					>
						<Select.Option value="address 1">Address 1</Select.Option>
						<Select.Option value="address 2">Address 2</Select.Option>
						<Select.Option value="address 3">Address 3</Select.Option>
					</Select>
				</Form.Item>
			</Col>

			<Col xs={24} lg={5}>
				<Form.Item label="House name/number" name="houseName">
					<Input placeholder="House name or number" />
				</Form.Item>
				<SimpleInput name="line1" label="Line 1" placeholder="Line 1" />
			</Col>

			<Col xs={24} lg={5}>
				<SimpleInput name="line2" label="Line 2" placeholder="Line 2" />
				<SimpleInput name="line3" label="Line 3" placeholder="Line 3" />
			</Col>

			<Col xs={24} lg={5}>
				<SimpleInput name="line4" label="Line 4" placeholder="Line 4" />
				<SimpleInput name="line5" label="Line 5" placeholder="Line 5" />
			</Col>

			<Col xs={24} lg={4}>
				<SimpleInput
					name="postTown"
					label="Post Town"
					placeholder="Post Town"
				/>
			</Col>

			<Col xs={24} lg={12}>
				<div
					style={{
						padding: '16px',
						border: '1px solid grey',
						height: '150px'
					}}
				>
					Map, in process
				</div>
			</Col>
		</Row>
	);
};
