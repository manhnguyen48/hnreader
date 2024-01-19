import type { PageServerLoad } from './$types';
import { getHNPost, getPostIds, isFulfilled } from '$lib/db';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const feed = params.feed + 'stories';
	let snapshot;
	snapshot = await getPostIds(feed);

	if (snapshot) {
		const posts = (
			await Promise.allSettled(snapshot.slice(0, 50).map(getHNPost)).then((result) =>
				result.filter(isFulfilled)
			)
		).map((p) => p.value);
		// Cache data so we don't query the server too much
		setHeaders({
			'cache-control': 'public, max-age=120, must-revalidate'
		});
		return {
			postIds: snapshot,
			posts: posts
		};
	} else {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}
};
