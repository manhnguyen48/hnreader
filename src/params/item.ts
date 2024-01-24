import type { ParamMatcher } from '@sveltejs/kit';
// Item should be inger number
export const match: ParamMatcher = (param) => {
    return /^\d+$/.test(param);
};