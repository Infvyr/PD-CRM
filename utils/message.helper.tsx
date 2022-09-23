import { message } from 'antd';
import axios from 'axios';

export function showError(error: unknown, key?: string) {
	if (axios.isAxiosError(error)) {
		const errorMessage = error.response?.data?.message;
		const content = Array.isArray(errorMessage)
			? errorMessage.map((msg, i) => <div key={i}>{msg}</div>)
			: errorMessage;
		message.error({
			content,
			key
		});
	} else if (error instanceof Error) {
		message.error({ content: error.message, key });
	} else {
		message.error({
			content: 'Something went wrong! Please try again later.',
			key
		});
	}
}
