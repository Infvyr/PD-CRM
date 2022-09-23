import { List, Typography } from 'antd';
import { isArray, isNumber, isString, includes } from 'lodash';

function RenderList(value: string | null | undefined) {
	if (!isString(value)) return;

	const dataArr =
		!isArray(value) && includes(value, ',') ? value?.split(',') : [value];

	return (
		<List
			dataSource={dataArr}
			renderItem={(item) => (
				<List.Item>
					<Typography.Text>{item}</Typography.Text>
				</List.Item>
			)}
		/>
	);
}

function AmountOfThings(
	value: number | undefined | null,
	fractionDigits = 2,
	currency = '£'
) {
	if (!isNumber(value)) return;
	return `${currency}${value?.toFixed(fractionDigits)}`;
}

function LinkToResource(
	value: string | null,
	label: string,
	rel = 'noreferrer, noopener, nofollow',
	target = '_blank'
) {
	if (!isString(value)) return;

	return (
		<a href={value} target={target} rel={rel}>
			{label}
		</a>
	);
}

export { RenderList, AmountOfThings, LinkToResource };
