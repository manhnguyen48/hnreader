<script lang="ts">
	import type { PostData } from '$lib/types';
	import scrollToTopIcon from '$lib/assets/scroll-top-icon.svg?raw';
	import Post from '$lib/components/post.svelte';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import jumboCat from '$lib/assets/jumbo-cat.gif';
	export let data: { posts: PostData[] };

	let showButton = false;
	let allPosts: PostData[];
	let posts: PostData[];
	let loading = false;
	let observer: IntersectionObserver | undefined;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
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
	onMount(() => {
		window.onscroll = () => {
			showButton = window.scrollY > 200;
		};
	});
	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

{#if $navigating}
	<div class="w-full h-screen flex flex-col gap-2 items-center justify-center">
		<p class="text-3xl">Loading...</p>
		<img src={jumboCat} alt="Happy Cat" width="40%" height="40%" />
	</div>
{:else}
	<div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 m-2 md:m-4">
		{#each posts as post (post.id)}
			<Post {post}></Post>
		{/each}
		{#if posts.length < allPosts.length}
			<div id="load-more" class="flex items-center justify-center">
				<span class="loading loading-ring loading-lg"></span>
			</div>
		{/if}
	</div>
	<button
		class="btn btn-square fixed bottom-28 right-4 justify-center items-center"
		aria-label="Scroll To Top"
		on:click={scrollToTop}
		style="display: {showButton ? 'flex' : 'none'}"
	>
		{@html scrollToTopIcon}
	</button>
{/if}
