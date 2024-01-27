<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';
	import type { PostData } from '$lib/types';
	import Post from '$lib/components/Post.svelte';
	import ScrollTop from '$lib/components/ScrollTop.svelte';
	import { getItem, isFulfilled } from '$lib/db';

	export let data: { postIds: number[] };
	let posts: PostData[];
	let postIds: number[] = [];
	let loading = false;
	let observer: IntersectionObserver | undefined;

	const loadMore = async (numPosts: number) => {
		loading = true;
		const morePostsIds = postIds.slice(posts.length, posts.length + numPosts);
		if (morePostsIds) {
			const morePosts: PostData[] = (await Promise.allSettled(morePostsIds.map(getItem)))
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
	afterUpdate(() => {
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					loadMore(20);
				}
			},
			{ threshold: 1.0, rootMargin: '0px', root: null }
		);
		const loadMoreEl = document.querySelector('#load-more');
		if (loadMoreEl) {
			observer.observe(loadMoreEl);
		}
	});
	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div
	class="m-2 mb-16 grid gap-2 sm:grid-cols-1 md:m-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9"
>
	{#each posts as post (post.id)}
		<Post {post}></Post>
	{/each}
	{#if posts.length < data.postIds.length}
		<div id="load-more" class="flex items-center justify-center">
			<span class="loading loading-ring loading-md"></span>
		</div>
	{/if}
</div>
