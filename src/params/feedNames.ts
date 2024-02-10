import type { ParamMatcher } from '@sveltejs/kit';
import { PossibleFeeds } from '$lib/types';

/**
 * Checks if a given parameter matches one of the possible feed names.
 */
export const match: ParamMatcher = (param) => {
	return PossibleFeeds.includes(param);
};
