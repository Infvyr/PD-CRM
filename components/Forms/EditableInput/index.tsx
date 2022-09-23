import { Input, Typography } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { ComponentPropsWithRef, FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Wrapper } from './EditableInput.styles';

const { Text, Paragraph } = Typography;

type Props = {
	name: string;
	placeholder?: string;
	tooltip?: string;
	inputProps?: ComponentPropsWithRef<typeof Input>;
	paragraphProps?: ComponentPropsWithRef<typeof Paragraph>;
} & ComponentPropsWithRef<typeof FormItem>;

const EditableInput: FC<Props> = ({
	name,
	placeholder,
	tooltip = 'click to edit',
	inputProps,
	...formItemProps
}) => {
	return (
		<Wrapper>
			<FormItem shouldUpdate style={{ marginBottom: 0 }} {...formItemProps}>
				{({ setFieldsValue, getFieldValue, validateFields }) => (
					<>
						<Paragraph
							editable={{
								icon: <EditOutlined />,
								tooltip: tooltip,
								onChange: (value) => {
									setFieldsValue({ [name]: value === '' ? undefined : value });
									validateFields([name]);
								}
							}}
							style={{ minWidth: '300px' }}
						>
							{inputProps?.type !== 'password' && getFieldValue(name) ? (
								getFieldValue(name)
							) : (
								<Text type="secondary">
									<i>{placeholder}</i>
								</Text>
							)}
						</Paragraph>
						<FormItem name={name} noStyle {...formItemProps}>
							<Input {...inputProps} hidden />
						</FormItem>
					</>
				)}
			</FormItem>
		</Wrapper>
	);
};

export default EditableInput;
