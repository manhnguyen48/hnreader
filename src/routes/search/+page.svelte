<script lang="ts">
	import { type PostData } from '$lib/types';
	import Post from '$lib/components/post.svelte';
	import LoadingPage from '$lib/components/loadingPage.svelte';
	import ErrorPage from '$lib/components/errorPage.svelte';

	export let data: { results: Promise<PostData[]> };
</script>

{#if data.results}
	{#await data.results}
		<LoadingPage />
	{:then hits}
		{#if hits.length < 1}
			<ErrorPage errorText="No results found" />
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
