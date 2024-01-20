import { getHNPost, getPostIds, isFulfilled } from '$lib/db';
import type { PageLoad } from '../$types';

export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	// @ts-ignore
	const feed: string = params.feed + 'stories';
	let snapshot;
	snapshot = await getPostIds(feed);

	if (!snapshot) {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}
	const posts = (
		await Promise.allSettled(snapshot.slice(0, 50).map(getHNPost)).then((result) =>
			result.filter(isFulfilled)
		)
	).map((p) => p.value);
	return {
		postIds: snapshot,
		posts: posts
	};
};
