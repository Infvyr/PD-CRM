import { ChangeEvent, useCallback, useState } from 'react';

export const useSearch = () => {
	const [search, setSearch] = useState<string>();
	const handleOnSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	return { search, handleOnSearch };
};
