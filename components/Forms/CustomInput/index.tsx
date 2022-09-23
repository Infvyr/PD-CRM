import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { ComponentPropsWithRef, FC } from 'react';

type Props = {
	inputProps?: ComponentPropsWithRef<typeof Input>;
} & ComponentPropsWithRef<typeof FormItem>;

const CustomInput: FC<Props> = ({ inputProps, ...formItemProps }) => {
	return (
		<FormItem {...formItemProps}>
			<Input {...inputProps} />
		</FormItem>
	);
};

export default CustomInput;
