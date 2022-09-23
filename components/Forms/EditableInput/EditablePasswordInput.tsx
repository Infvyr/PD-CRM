import { Input, Tooltip } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { ComponentPropsWithRef, FC, useEffect, useState } from 'react';
import {
	EditOutlined,
	EyeTwoTone,
	EyeInvisibleOutlined
} from '@ant-design/icons';
import { StyledPasswordInput } from './EditableInput.styles';

type Props = {
	name: string;
	tooltip?: string;
	inputProps?: ComponentPropsWithRef<typeof Input>;
} & ComponentPropsWithRef<typeof FormItem>;

type ShowPasswordIconProps = {
	visible: boolean;
	bordered: boolean;
	tooltip: string;
	onChange: (visible: boolean) => void;
};

const EditablePasswordInput: FC<Props> = ({
	name,
	tooltip = 'click to edit',
	inputProps,
	...formItemProps
}: Props) => {
	const [bordered, setBordered] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [passwordKey, setPasswordKey] = useState(0);

	return (
		<>
			<FormItem
				name={name}
				shouldUpdate
				style={{ marginBottom: 0, maxWidth: '300px' }}
				{...formItemProps}
			>
				<StyledPasswordInput
					key={passwordKey}
					{...inputProps}
					disabled={disabled}
					bordered={bordered}
					onFocus={() => {
						setBordered(true);
					}}
					placeholder={'********'}
					onBlur={() => {
						setPasswordKey((prev) => prev + 1);
						setBordered(false);
						setDisabled(true);
					}}
					iconRender={(visible) =>
						visible ? (
							<EyeTwoTone />
						) : bordered ? (
							<EyeInvisibleOutlined />
						) : (
							<Tooltip title={tooltip}>
								<EditOutlined
									onClick={() => {
										setDisabled(false);
										setBordered(true);
									}}
								/>
							</Tooltip>
						)
					}
				/>
			</FormItem>
		</>
	);
};

export default EditablePasswordInput;
