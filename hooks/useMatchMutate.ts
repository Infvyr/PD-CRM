import { useSWRConfig } from 'swr';

type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
	? Tail
	: never;

export function useMatchMutate() {
	const { cache, mutate } = useSWRConfig();
	return (matcher: RegExp, ...args: Tail<Parameters<typeof mutate>>) => {
		if (!(cache instanceof Map)) {
			throw new Error(
				'matchMutate requires the cache provider to be a Map instance'
			);
		}

		const keys = [];

		for (const key of cache.keys()) {
			if (matcher.test(key)) {
				keys.push(key);
			}
		}

		const mutations = keys.map((key) => mutate(key, ...args));
		return Promise.all(mutations);
	};
}
