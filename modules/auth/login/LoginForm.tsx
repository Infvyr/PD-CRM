import { Card, Form } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import {
	Password,
	QuickActions,
	SubmitButton,
	Username
} from '../../../components';
import { validateMessages } from '../../../config/Forms/validate-messages';
import useAuth from '../../../hooks/useAuth';
import { Login } from '../../../types/interfaces';

export const LoginForm: FC = () => {
	const [mail, setMail] = useState<string>();
	const [pwd, setPwd] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const { isLoggedIn, login } = useAuth();

	const router = useRouter();
	const [form] = Form.useForm();

	const onFieldsChange = () => {
		setMail(form.getFieldsValue().email);
		setPwd(form.getFieldsValue().password);
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/dashboard');
		}
	}, [router, isLoggedIn]);

	const onFinish = async ({ email, password }: Login) => {
		try {
			setLoading(true);
			await login(email, password);
		} finally {
			setLoading(false);
		}
	};

	if (isLoggedIn) return null;

	return (
		<Card bordered bodyStyle={{ paddingBottom: 0 }}>
			<Form
				form={form}
				onFinish={onFinish}
				onFieldsChange={onFieldsChange}
				validateMessages={validateMessages}
			>
				<Username />
				<Password />
				<QuickActions />
				<SubmitButton disabled={!mail || !pwd} isLoading={loading} />
			</Form>
		</Card>
	);
};
