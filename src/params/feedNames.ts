import type { ParamMatcher } from '@sveltejs/kit';
import { PossibleFeeds } from '$lib/types';

export const match: ParamMatcher = (param) => {
	return PossibleFeeds.includes(param);
};
