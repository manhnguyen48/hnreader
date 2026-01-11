<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { HNItem } from '$lib/types';
	import Post from '$lib/components/Post.svelte';
	import { getItem, isFulfilled } from '$lib/db';
	import { page } from '$app/state';
	import { capitalise } from '$lib/utils';

	const INTERSECTION_MARGIN = 50;

	let { data } = $props<{ postIds: number[] }>();
	let posts = $state<HNItem[]>([]);
	let postIds = $state<number[]>([]);
	let loading = $state(false);
	let observer: IntersectionObserver | undefined;
	let loadMoreEl: HTMLElement | null = $state(null);

	const loadMore = async (numPosts: number) => {
		loading = true;
		const morePostsIds = postIds.slice(posts.length, posts.length + numPosts);
		if (morePostsIds.length > 0) {
			const morePosts: HNItem[] = (await Promise.allSettled(morePostsIds.map(getItem)))
				.filter(isFulfilled)
				.map((result) => result.value);
			if (morePosts.length > 0) {
				posts = [...posts, ...morePosts];
			}
		}
		loading = false;
	};

	const isIntersectingWithMargin = (el: HTMLElement, margin: number = INTERSECTION_MARGIN) => {
		const rect = el.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const windowWidth = window.innerWidth || document.documentElement.clientWidth;

		return (
			rect.bottom > margin &&
			rect.right > margin &&
			rect.left < windowWidth - margin &&
			rect.top < windowHeight - margin
		);
	};

	onMount(() => {
		postIds = data.postIds;
		loadMore(30);

		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					loadMore(20);
				}
			},
			{ rootMargin: `-${INTERSECTION_MARGIN}px` }
		);
	});

	$effect(() => {
		if (loadMoreEl && observer) {
			observer.observe(loadMoreEl);
			if (isIntersectingWithMargin(loadMoreEl) && !loading && posts.length < postIds.length) {
				loadMore(20);
			}
			return () => {
				if (loadMoreEl && observer) {
					observer.unobserve(loadMoreEl);
				}
			};
		}
	});
	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<svelte:head>
	<title>{capitalise(page.params.feed || 'HN')} Stories</title>
</svelte:head>
<div class="m-2 mb-16 grid gap-2 sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
	{#each posts as post (post.id)}
		<Post {post}></Post>
	{/each}
	{#if posts.length < data.postIds.length}
		<div bind:this={loadMoreEl} id="load-more" class="flex items-center justify-center">
			<span class="loading loading-ring loading-md"></span>
		</div>
	{/if}
</div>
