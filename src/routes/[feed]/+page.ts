import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;
export const load: PageLoad = async ({ fetch, setHeaders, params }) => {
	const feeds: string[] = ['top', 'new', 'best', 'ask', 'show', 'job'];
	if (!feeds.includes(params.feed)) {
		error(404, 'Not Found');
	}
	async function fetchPostIds(feed: string): Promise<number[]> {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/${feed}stories.json`, {
			cache: 'no-cache',
			headers: { 'content-type': 'application/json' }
		});
		const postIds = await response.json();
		return postIds;
	}
	const ids = await fetchPostIds(params.feed);
	return {
		ids: ids
	};
};
