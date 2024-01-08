<script lang="ts">
	import { onMount } from 'svelte';
	import Post from '$lib/components/post.svelte';
	import happyCat from '$lib/assets/cat-cute.gif';
	import type { PostData } from '$lib/types';
	export let data: { ids: number[] };
	let ids: number[];
	let posts: PostData[] = [];
	let currentItems = 50;
	let isLoadingFeed = false;
	let isLoadingMore = false;
	const fetchPost = async(id: number): Promise<PostData> => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
			cache: 'force-cache',
			headers: { 'cache-control': 'public, max-age=3600', 'content-type': 'application/json' }
		});
		const post: PostData = await response.json();
		return post;
	}
	const loadPosts = async () => {
		isLoadingFeed = true;
		posts = await Promise.all(ids.slice(0, currentItems).map((id) => fetchPost(id)));
		isLoadingFeed = false;
	};
	const loadMore = async () => {
		isLoadingMore = true;
		currentItems += 50;
		const newPosts = await Promise.all(
			ids.slice(posts.length, currentItems).map((id) => fetchPost(id))
		);
		posts = [...posts, ...newPosts];
		isLoadingMore = false;
	};
	$: {
		ids = data.ids;
		currentItems = 50
		loadPosts();
	}
	onMount(() => loadPosts());
</script>

{#if isLoadingFeed}
	<div class="w-full h-screen flex flex-col gap-2 items-center justify-center">
		<p class="text-4xl">Loading...</p>
		<img src={happyCat} alt="happy cat" width="20%" height="20%"/>
	</div>
{:else}
	<div class="grid sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-2 m-2 md:m-4">
		{#each posts as post}
			<Post {post} />
		{/each}
		{#if currentItems < ids.length}
			<div class="flex justify-center items-center">
				<button class="btn btn-primary w-max" on:click={loadMore}>
					{#if isLoadingMore}
						<span class="loading loading-spinner"></span>Loading...
					{:else}
						<span>Load More</span>
					{/if}
				</button>
			</div>
		{/if}
	</div>
{/if}
