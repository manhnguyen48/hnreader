<script lang="ts">
	import type { HNItem } from '$lib/types';
	import { scale } from 'svelte/transition';
	import { expoIn, expoOut } from 'svelte/easing';
	import PostStats from './PostStats.svelte';
	export let post: HNItem;
</script>

<div
	class="post"
	in:scale={{ duration: 200, delay: 300, easing: expoOut }}
	out:scale={{ duration: 200, easing: expoIn }}
>
	<a
		href={post.url ? post.url : `/story/${post.id}`}
		target={post.url ? '_blank' : '_self'}
		rel="noopener noreferrer"
		class="px-1 underline-offset-4 visited:text-indigo-400 hover:underline"
	>
		<header class="text-base">{post.title}</header>
		<span class="text-xs font-light">{post.url ? `(${new URL(post.url).hostname})` : ''}</span>
	</a>
	<div class="flex items-center justify-end">
		<a
			href="/story/{post.id}"
			data-sveltekit-preload-data="hover"
			rel="noopener noreferrer"
			class="rounded-md p-1 hover:bg-neutral hover:text-neutral-content"
		>
			<PostStats score={post.score} descendants={post.descendants} time={post.time} />
		</a>
	</div>
</div>
