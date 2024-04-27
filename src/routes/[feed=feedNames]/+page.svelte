<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { HNItem } from '$lib/types';
	import Post from '$lib/components/Post.svelte';
	import { getItem, isFulfilled } from '$lib/db';
	import { page } from '$app/stores';
	import { capitalise } from '$lib/utils';

	export let data: { postIds: number[] };
	let posts: HNItem[];
	let postIds: number[] = [];
	let loading = false;
	let observer: IntersectionObserver | undefined;

	/**
	 * Loads more posts by fetching additional post IDs from the server.
	 * Fetches full post data for the additional IDs via getItem(), filters out rejected promises,
	 * and concatenates the additional posts onto the existing posts array.
	 * Handles loading state before and after the async operation.
	 */
	const loadMore = async (numPosts: number) => {
		loading = true;
		const morePostsIds = postIds.slice(posts.length, posts.length + numPosts);
		if (morePostsIds) {
			const morePosts: HNItem[] = (await Promise.allSettled(morePostsIds.map(getItem)))
				.filter(isFulfilled)
				.map((result) => result.value);
			if (morePosts) {
				posts = [...posts, ...morePosts];
			}
		}
		loading = false;
	};
	$: {
		posts = [];
		postIds = data.postIds;
	}
	/**
	 * After the component updates, set up an IntersectionObserver to watch when the
	 * "load more" element comes into view. When it does, load another batch of posts.
	 * Disconnect the observer when unmounted to avoid memory leaks.
	 */
	afterUpdate(() => {
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					loadMore(20);
				}
			},
			{ rootMargin: '350px' }
		);
		const loadMoreEl = document.querySelector('#load-more');
		if (loadMoreEl) {
			observer.observe(loadMoreEl);
		} else {
			observer.disconnect();
		}
	});
	onMount(() => loadMore(30));
	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<svelte:head>
	<title>{capitalise($page.params.feed)} HN Stories</title>
</svelte:head>
<div class="m-2 mb-16 grid gap-2 sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
	{#each posts as post (post.id)}
		<Post {post}></Post>
	{/each}
	{#if posts.length < data.postIds.length}
		<div id="load-more" class="flex items-center justify-center">
			<span class="loading loading-ring loading-md"></span>
		</div>
	{/if}
</div>
