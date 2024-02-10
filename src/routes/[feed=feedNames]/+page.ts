import { getPostIds } from '$lib/db';
import type { PageLoad } from '../$types';

interface RouteParams {
	feed: string;
}

export const ssr = false;
/**
 * Server route to load posts for a feed.
 *
 * Loads post IDs for the given feed from the database.
 * Handles 404 if feed not found.
 */
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
