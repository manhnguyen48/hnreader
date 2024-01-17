<script lang="ts">
	import { page } from '$app/stores';
	import Post from '$lib/components/post.svelte';
	import { type PostData } from '$lib/types';
	import { error } from 'console';

	const queryString: string | null = $page.url.searchParams.get('query');
	// Search HN stories in the last 1 month
	//TODO: Add custom filters
	const searchHN = async (): Promise<PostData[]> => {
		const now: Date = new Date();
		const aMonthAgo: Date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const resp = await fetch(
			`http://hn.algolia.com/api/v1/search?query=${queryString}&tags=story&hitsPerPage=50&numericFilters=created_at_i>=${Math.floor(
				aMonthAgo.getTime() / 1000
			)}`
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
</script>

{#if queryString}
	{#await searchHN()}
		Searching....
	{:then hits}
		{#if hits.length < 1}
			No results found
		{:else}
			<div
				class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 m-2 md:m-4 mb-16"
			>
				{#each hits as post (post.id)}
					<Post {post} />
				{/each}
			</div>
		{/if}
	{:catch error}
		Error: {error.message}
	{/await}
{/if}
