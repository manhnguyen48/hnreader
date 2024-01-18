<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import type { PostData } from '$lib/types';
	import Post from '$lib/components/post.svelte';
	import ScrollTop from '$lib/components/scrollTop.svelte';
	import LoadingPage from '$lib/components/loadingPage.svelte';
	export let data: { posts: PostData[] };

	let allPosts: PostData[];
	let posts: PostData[];
	let loading = false;
	let observer: IntersectionObserver | undefined;

	const loadMore = () => {
		loading = true;
		const morePosts = allPosts.slice(posts.length, posts.length + 20); // Load 20 more posts
		posts = [...posts, ...morePosts];
		loading = false;
	};
	$: {
		if (data && data.posts) {
			allPosts = data.posts;
			posts = allPosts.slice(0, 50);
		}
	}
	afterUpdate(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].intersectionRatio > 0 && !loading) {
					loadMore();
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
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div
	class="m-2 mb-16 grid gap-2 sm:grid-cols-1 md:m-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
>
	{#each posts as post (post.id)}
		<Post {post}></Post>
	{/each}
	{#if posts.length < allPosts.length}
		<div id="load-more" class="flex items-center justify-center">
			<LoadingPage />
		</div>
	{/if}
</div>
<ScrollTop />
