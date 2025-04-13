<script lang="ts">
	import type { HNItem } from '$lib/types';
	import { scale } from 'svelte/transition';
	import { expoIn, expoOut } from 'svelte/easing';
	import PostStats from './PostStats.svelte';
	interface Props {
		post: HNItem;
	}

	let { post }: Props = $props();
</script>

<div
	class="post"
	in:scale={{ duration: 200, delay: 300, easing: expoOut }}
	out:scale={{ duration: 200, easing: expoIn }}
>
	<a
		href={post.url ? post.url : `/story/${post.id}`}
		target={post.url ? '_blank' : '_self'}
		rel="noopener noreferrer {post.url ? '' : 'external'}"
		class="px-1 underline-offset-4 visited:text-indigo-500 hover:underline"
	>
		<header class="text-base">{post.title}</header>
		<span class="text-xs font-light">{post.url ? `(${new URL(post.url).hostname})` : ''}</span>
	</a>
	<div class="flex items-center justify-end">
		<a
			href="/story/{post.id}"
			data-sveltekit-preload-data="tap"
			rel="noopener noreferrer"
			class="rounded-md p-1 visited:text-indigo-500
			hover:bg-neutral hover:text-neutral-content"
		>
			<PostStats
				score={post.score ?? 0}
				descendants={post.descendants ?? 0}
				time={post.time ?? 0}
			/>
		</a>
	</div>
</div>
