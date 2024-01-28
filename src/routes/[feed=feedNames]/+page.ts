import { getPostIds } from '$lib/db';
import type { PageLoad } from '../$types';

interface RouteParams {
	feed: string;
}

export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	const feed: string = `${(params as RouteParams).feed}stories`;
	let snapshot;
	snapshot = await getPostIds(feed);

	if (!snapshot) {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}

	return {
		postIds: snapshot
	};
};
