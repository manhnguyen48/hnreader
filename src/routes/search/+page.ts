import algoliasearch from 'algoliasearch';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ url }) => {
	const client = algoliasearch('UJ5WYC0L7X', '28f0e1ec37a5e792e6845e67da5f20dd');
	const index = client.initIndex('Item_dev');
	const searchQuery: string | null = url.searchParams.get('query');

	if (searchQuery) {
		const now: Date = new Date();
		const aMonthAgo: Date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const algoliaResp = await index.search(searchQuery, {
			hitsPerPage: 50,
			tagFilters: 'story',
			numericFilters: [`created_at_i>=${Math.floor(aMonthAgo.getTime() / 1000)}`],
			restrictSearchableAttributes: ['title', 'url', 'story_text'],
			attributesToRetrieve: [
				'author',
				'story_id',
				'children',
				'points',
				'created_at_i',
				'title',
				'url'
			]
		});
		const searchResults = algoliaResp.hits.map((hit: any) => {
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
		return { results: searchResults };
	}
};
