import { ComponentPropsWithRef, FC } from 'react';
import debounce from 'lodash/debounce';
import { StyledForm } from './SearchForm.styles';

type Props = {
	debounce?: number;
	placeholder?: string;
} & ComponentPropsWithRef<typeof StyledForm>;

export const SearchForm: FC<Props> = ({
	debounce: debounceProp = 300,
	placeholder = 'Search',
	onChange = () => {},
	...searchProps
}: Props): JSX.Element => {
	return (
		<StyledForm
			{...searchProps}
			allowClear
			type="search"
			placeholder={placeholder}
			onChange={debounce(onChange, debounceProp)}
		/>
	);
};
