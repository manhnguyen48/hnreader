import type { PageLoad } from "../$types"
import { type PostData } from "$lib/types";

export const ssr = false

export const load: PageLoad = async ({url, fetch}) => {
    const searchHN = async (queryString: string): Promise<PostData[]> => {
		const now: Date = new Date();
		const aMonthAgo: Date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const resp = await fetch(
			`http://hn.algolia.com/api/v1/search?query=${queryString}&tags=story&hitsPerPage=50&numericFilters=created_at_i>=${Math.floor(
				aMonthAgo.getTime() / 1000
			)}`, 
		);
		const res = await resp.json();
		const hits = res.hits.map((hit: any) => {
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
		return hits;
	};
    const params = new URLSearchParams(url.search)
    const queryString = params.get('query') 
    if (queryString) {
        return {
            results: searchHN(queryString)
        }
    }  
}