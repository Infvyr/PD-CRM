import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { FC, ReactNode, ComponentPropsWithRef } from 'react';
import { useRouter } from 'next/router';

type Props = {
	btnText?: string;
	btnType?: ButtonType;
	icon?: ReactNode;
	key?: string | number;
	onClick?: () => void;
	url?: string;
} & ComponentPropsWithRef<typeof Button>;

export const CustomButton: FC<Props> = ({
	btnText = 'Add',
	btnType = 'primary',
	icon = '',
	onClick = () => {},
	url,
	...buttonProps
}): JSX.Element => {
	const router = useRouter();

	const handleOnClick = () => router.push(url!);

	return (
		<Button
			type={btnType}
			icon={icon}
			onClick={() => (url ? handleOnClick() : onClick())}
			{...buttonProps}
		>
			{btnText}
		</Button>
	);
};
