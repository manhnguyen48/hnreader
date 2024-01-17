<script lang="ts">
	import { type PostData } from '$lib/types';
	import Post from '$lib/components/post.svelte';
	import ErrorPage from '$lib/components/errorPage.svelte';

	export let data: { results: PostData[] };
</script>

{#if data.results}
	{#if data.results.length < 1}
		<ErrorPage errorText="No results found" />
	{:else}
		<div
			class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 m-2 md:m-4 mb-16"
		>
			{#each data.results as post (post.id)}
				<Post {post} />
			{/each}
		</div>
	{/if}

{/if}
