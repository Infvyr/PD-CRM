import { useState } from 'react';

export const useClipBoard = () => {
	const [copySuccess, setCopySuccess] = useState<string>('Click to copy');

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopySuccess('Copied!');
		} catch (err) {
			setCopySuccess('Failed to copy!');
		} finally {
			setTimeout(() => setCopySuccess('Click to copy'), 1500);
		}
	};

	return { copySuccess, copyToClipboard };
};
