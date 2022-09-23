import { PlusOutlined } from '@ant-design/icons';
import {
	AutoComplete,
	Button,
	Col,
	Drawer,
	Form,
	Input,
	Row,
	Select
} from 'antd';
import { FC, useState } from 'react';
import { rules } from '../../../../config/Forms/rules';
import { useDrawer } from '../../../../hooks/useDrawer';
import { EmptyData, SimpleInput } from '../../../../components';
import { AddressFormWidget } from '../../widgets/AddressForm/AddressFormWidget';

const postcodes = [
	{ value: 'SW1W 0NY' },
	{ value: 'PO16 7GZ' },
	{ value: 'L1 8JQ' }
];

type Props = {
	label?: string;
	name?: string;
	inWidget?: boolean;
	onCreateAddress?: boolean;
};

export const AddressPostcode: FC<Props> = ({
	name = 'postcode',
	label = 'Postcode',
	inWidget = false,
	onCreateAddress
}): JSX.Element => {
	const [showAddress, setShowAddress] = useState<boolean>(false);
	const { showDrawer, isDrawerVisible, onClose } = useDrawer();

	const handleSelect = (value: string) => {
		if (value) setShowAddress(true);
	};

	return (
		<>
			<Row gutter={24}>
				<Col
					xs={24}
					lg={onCreateAddress ? 5 : inWidget ? 12 : 24}
					className="as"
				>
					<Form.Item label={label} name={name} rules={rules.addressPostcode}>
						<AutoComplete
							allowClear
							dropdownRender={(menu) => (
								<>
									{menu}
									{!inWidget ? (
										<>
											<div style={{ height: '5px' }} />
											<Button
												block
												type="primary"
												icon={<PlusOutlined />}
												onClick={showDrawer}
											>
												Add new address
											</Button>
										</>
									) : null}
								</>
							)}
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							notFoundContent={
								<EmptyData description={`No ${label?.toLowerCase()} found!`} />
							}
							options={postcodes}
							placeholder={`Type or select a ${label?.toLowerCase()}`}
							onSelect={handleSelect}
						/>
					</Form.Item>

					{showAddress && (
						<Form.Item label="Address" name="address">
							<Select
								showSearch
								allowClear
								notFoundContent={
									<EmptyData description={`No address found!`} />
								}
								optionFilterProp="children"
								placeholder="Type or select a address"
							>
								<Select.Option value="address 1">Address 1</Select.Option>
								<Select.Option value="address 2">Address 2</Select.Option>
								<Select.Option value="address 3">Address 3</Select.Option>
							</Select>
						</Form.Item>
					)}
				</Col>

				{showAddress && (
					<>
						<Col xs={24} lg={inWidget ? 12 : 5}>
							<Form.Item label="House name/number" name="houseName">
								<Input placeholder="House name or number" />
							</Form.Item>
							<SimpleInput name="line1" label="Line 1" placeholder="Line 1" />
						</Col>
						<Col xs={24} lg={inWidget ? 12 : 5}>
							<SimpleInput name="line2" label="Line 2" placeholder="Line 2" />
							<SimpleInput name="line3" label="Line 3" placeholder="Line 3" />
						</Col>
						<Col xs={24} lg={inWidget ? 12 : 5}>
							<SimpleInput name="line4" label="Line 4" placeholder="Line 4" />
							<SimpleInput name="line5" label="Line 5" placeholder="Line 5" />
						</Col>
						<Col xs={24} lg={inWidget ? 12 : 4}>
							<SimpleInput
								name="postTown"
								label="Post Town"
								placeholder="Post Town"
							/>
						</Col>
						<Col xs={24} lg={inWidget ? 24 : 12}>
							<div
								style={{
									marginBottom: '2rem',
									padding: '16px',
									border: '1px solid grey',
									height: '200px'
								}}
							>
								Map, in process
							</div>
						</Col>
					</>
				)}
			</Row>

			<Drawer
				title="New Address"
				width="30vw"
				placement="right"
				onClose={onClose}
				visible={isDrawerVisible}
				bodyStyle={{ padding: '0 24px' }}
			>
				<AddressFormWidget />
			</Drawer>
		</>
	);
};
