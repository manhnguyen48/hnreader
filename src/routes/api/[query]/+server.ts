import { json, type HttpError, type RequestHandler } from '@sveltejs/kit';
import type { PostData } from '$lib/types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const { query } = params;
	const now: Date = new Date();
	const aMonthAgo: Date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	const resp = await fetch(
		`https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=50&numericFilters=created_at_i>=${Math.floor(
			aMonthAgo.getTime() / 1000
		)}`
	);
	if (!resp.ok) {
		throw new Error(`HTTP error! status: ${resp.status}`);
	}
	const res = await resp.json();
    // Translating to be the same as the firebase API
	const hits: PostData[] = res.hits.map((hit: any) => {
		return {
			by: hit.author,
			id: hit.story_id,
			kids: hit.children,
			score: hit.points,
			time: hit.created_at_i,
			title: hit.title,
			url: hit.url
		};
	});
	return json(hits);
};