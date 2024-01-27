<script lang="ts">
	import type { PostData } from '$lib/types';
	import { sanitiseHTML } from '$lib/utils';
	import PostStats from './PostStats.svelte';
	export let post: PostData;
</script>

<article class="min-w-full rounded-xl border border-neutral p-3 shadow-xl 2xl:min-w-[200ch]">
	<header class="flex flex-col gap-1">
		<div class="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
			<a
				href={post.url ? post.url : `#`}
				target={post.url ? '_blank' : '_self'}
				rel="noopener noreferrer"
				class="underline-offset-4 visited:text-indigo-400 hover:underline"
			>
				<h1 class="text-wrap text-xl">{post.title}</h1>
			</a>
			<PostStats {...post} />
		</div>
		<span class="text-xs font-light">
			{post.url ? `(${new URL(post.url).hostname})` : ''}
		</span>
	</header>
	{#if post.text}
		<details class="mt-4">
			<summary class="btn btn-sm cursor-pointer font-normal"> &#128898; Details </summary>
			<p
				class="prose prose-base my-2 border border-transparent border-t-neutral py-2 xl:min-w-[120ch]"
			>
				{@html sanitiseHTML(post.text)}
			</p>
		</details>
	{/if}
</article>

<style>
	details[open] summary ~ * {
		animation: appear 0.6s ease-in-out;
	}

	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
