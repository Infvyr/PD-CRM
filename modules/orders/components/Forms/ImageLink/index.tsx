import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { StyledSpace, StyledLabel } from './ImageLink.styles';

export const ImageLink: FC = (): JSX.Element => {
	return (
		<>
			<StyledLabel>Image link</StyledLabel>
			<Form.List name="imageLinks">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<StyledSpace key={key} size="middle">
								<Form.Item {...restField} name={[name, 'url']}>
									<Input
										type="url"
										placeholder="https://example.com/image-title.jpg"
									/>
								</Form.Item>
								<MinusCircleOutlined onClick={() => remove(name)} />
							</StyledSpace>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								Add image link
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</>
	);
};
