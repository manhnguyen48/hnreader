<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post.svelte';
	import ErrorPage from '$lib/components/ErrorPage.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Search Hacker News</title>
</svelte:head>
{#if data.results}
	{#if data.results.length < 1}
		<ErrorPage errorText="No results found" />
	{:else}
		<div
			class="m-2 mb-16 grid gap-2 sm:grid-cols-1 md:m-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
		>
			{#each data.results as post}
				<Post {post} />
			{/each}
		</div>
	{/if}
{/if}
