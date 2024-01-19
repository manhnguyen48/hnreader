<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';
	import type { PostData } from '$lib/types';
	import Post from '$lib/components/post.svelte';
	import ScrollTop from '$lib/components/scrollTop.svelte';

	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, get, child } from 'firebase/database';
	const firebaseConfig = {
		databaseURL: 'https://hacker-news.firebaseio.com'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Realtime Database and get a reference to the service
	const db = getDatabase(app);

	// Function to query a single post given an ID
	const getHNPost = async (id: number): Promise<PostData> => {
		const snapshot = await get(child(ref(db), `v0/item/${id}`));
		return snapshot.val();
	};

	export let data: { postIds: number[]; posts: PostData[] };

	let posts: PostData[];
	let loading = false;
	let observer: IntersectionObserver | undefined;
	const isFulfilled = <PostData,>(
		p: PromiseSettledResult<PostData>
	): p is PromiseFulfilledResult<PostData> => p.status === 'fulfilled';
	const loadMore = async () => {
		loading = true;
		const morePostsIds = data.postIds.slice(posts.length, posts.length + 20); // Load 20 more posts
		if (morePostsIds) {
			const morePosts = await Promise.allSettled(morePostsIds.map(getHNPost))
			.then((res) => res.filter(isFulfilled))
			.then((fulfilled) => fulfilled.map((p) => p.value));
		if (morePosts) {
			posts = [...posts, ...morePosts];
		}
		}
		loading = false;
	};
	$: {
		if (data && data.posts) {
			posts = data.posts;
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
	{#if posts.length < data.postIds.length}
		<div id="load-more" class="flex items-center justify-center">
			<span class="loading loading-ring loading-md"></span>
		</div>
	{/if}
</div>
<ScrollTop />
