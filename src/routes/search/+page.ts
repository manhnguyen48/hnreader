import algoliasearch from 'algoliasearch';
import type { PageLoad } from '../$types';

const client = algoliasearch('UJ5WYC0L7X', '28f0e1ec37a5e792e6845e67da5f20dd');
const index = client.initIndex('Item_dev');

const getTimeFilter = (timeOption: string): [] | string[] => {
	const now: Date = new Date();
	switch (timeOption.toLowerCase()) {
		case 'past month':
			const aMonthAgo: Date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
			return [`created_at_i>=${Math.floor(aMonthAgo.getTime() / 1000)}`];
		case 'past week':
			const aWeekAgo: Date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
			return [`created_at_i>=${Math.floor(aWeekAgo.getTime() / 1000)}`];
		default:
			return [];
	}
};

const searchHN = async (searchQuery: string, timeOption: string, size: string) => {
	const algoliaResp = await index.search(searchQuery, {
		hitsPerPage: parseInt(size),
		tagFilters: 'story',
		numericFilters: getTimeFilter(timeOption),
		restrictSearchableAttributes: ['title', 'url', 'story_text'],
		attributesToRetrieve: [
			'author',
			'story_id',
			'children',
			'num_comments',
			'points',
			'created_at_i',
			'title',
			'url'
		]
	});
	return algoliaResp.hits.map((hit: any) => {
		return {
			by: hit.author,
			id: hit.story_id,
			kids: hit.children,
			descendants: hit.num_comments,
			score: hit.points,
			time: hit.created_at_i,
			title: hit.title,
			url: hit.url
		};
	});
};
export const ssr = false;
export const load: PageLoad = async ({ url }) => {
	const searchQuery: string | null = url.searchParams.get('q');
	const timeFilter: string | null = url.searchParams.get('t');
	const pageSize: string | null = url.searchParams.get('s');
	if (searchQuery && timeFilter && pageSize) {
		const searchResults = await searchHN(searchQuery, timeFilter, pageSize);
		return { results: searchResults };
	}
};
