import { getPostIds, getItem } from '$lib/db';
import type { HNItem } from '$lib/types';
import type { PageLoad } from '../$types';

interface RouteParams {
	feed: string;
}

export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	const feed: string = `${(params as RouteParams).feed}stories`;
	let postIds: number[];
	postIds = await getPostIds(feed);

	if (!postIds) {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}
	// Get the first 50 posts to load first
	const initialPosts: HNItem[] = await Promise.all(postIds.slice(0, 50).map(getItem));

	return {
		postIds: postIds,
		initialPosts: initialPosts
	};
};
