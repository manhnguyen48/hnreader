<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import Post from '$lib/components/post.svelte';
	import happyCat from '$lib/assets/cat-cute.gif';
	import scrollToTopIcon from '$lib/assets/scroll-top-icon.svg?raw'
	import type { PostData } from '$lib/types';
	export let data: { ids: number[] };
	let ids: number[];
	let posts: PostData[] = [];
	let currentItems = 50;
	let isLoadingFeed = false;
	let isLoadingMore = false;
	
	const fetchPost = async (id: number): Promise<PostData> => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
			cache: 'force-cache',
			headers: {
				'cache-control': 'public, max-age=3600, must-revalidate',
				'content-type': 'application/json'
			}
		});
		const post: PostData = await response.json();
		return post;
	};
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
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	$: {
		ids = data.ids;
		currentItems = 50;
		loadPosts();
	}
	onMount(() => {
		loadPosts();
		window.onscroll = () => {
			showButton = window.innerHeight + window.scrollY >= document.body.offsetHeight;
		};
	});
</script>

{#if isLoadingFeed}
	<div class="w-full h-screen flex flex-col gap-2 items-center justify-center">
		<p class="text-4xl">Loading...</p>
		<img src={happyCat} alt="happy cat" width="20%" height="20%" />
	</div>
{:else}
	<div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 m-2 md:m-4">
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
	
{/if} -->

<script lang="ts">
	import type { PostData } from '$lib/types';
	import scrollToTopIcon from '$lib/assets/scroll-top-icon.svg?raw';
	import Post from '$lib/components/post.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
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
	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !loading) {
				loadMore()
			}
		});
		const loadMoreEl = document.querySelector('#load-more');
		if (loadMoreEl) {
			observer.observe(loadMoreEl);
		}
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

<div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 m-2 md:m-4">
	{#each posts as post}
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
