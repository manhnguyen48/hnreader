<script lang="ts">
	import type { PostData } from '$lib/types';
	import { scale } from 'svelte/transition';
	import { expoIn, expoOut } from 'svelte/easing';
	import { Clock, MessageSquare, ArrowUp } from 'lucide-svelte';

	export let post: PostData;
	function timeDifference(previous: number): string {
		const sPerMinute: number = 60;
		const sPerHour: number = sPerMinute * 60;
		const sPerDay: number = sPerHour * 24;
		const sPerMonth: number = sPerDay * 30;
		const sPerYear: number = sPerDay * 365;
		const elapsed: number = Date.now() / 1000 - previous;

		if (elapsed < sPerMinute) {
			return Math.round(elapsed / 1000) + 's';
		} else if (elapsed < sPerHour) {
			return Math.round(elapsed / sPerMinute) + 'm';
		} else if (elapsed < sPerDay) {
			return Math.round(elapsed / sPerHour) + 'h';
		} else if (elapsed < sPerMonth) {
			return Math.round(elapsed / sPerDay) + 'D';
		} else if (elapsed < sPerYear) {
			return Math.round(elapsed / sPerMonth) + 'M';
		} else {
			return Math.round(elapsed / sPerYear) + 'Y';
		}
	}
</script>

<div
	class="flex min-h-[2rem] select-none flex-col justify-between gap-2 break-words rounded-2xl border border-solid border-neutral p-2 shadow-xl md:gap-4"
	in:scale={{ duration: 500, delay: 600, easing: expoOut }}
	out:scale={{ duration: 500, easing: expoIn }}
>
	<a
		href={post.url ? post.url : `https://news.ycombinator.com/item?id=${post.id}`}
		target="_blank"
		rel="noopener noreferrer"
		class="px-1 underline-offset-4 visited:text-indigo-400 hover:underline"
	>
		<header class="text-base">{post.title}</header>
		<span class="text-xs font-light">{post.url ? `(${new URL(post.url).hostname})` : ''}</span>
	</a>
	<div class="grid items-center justify-end">
		<a
			href="https://news.ycombinator.com/item?id={post.id}"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-md hover:bg-neutral hover:text-neutral-content"
		>
			<div
				class="flex min-w-36 items-end justify-between py-0.5 font-mono text-xs font-light md:min-w-32"
			>
				<span class="flex items-center gap-0.5"
					><ArrowUp size="14" strokeWidth="2" /> {post.score}</span
				>
				<span class="flex items-center gap-0.5"
					><MessageSquare size="14" strokeWidth="2" /> {post.kids ? post.kids.length : 0}</span
				>
				<span class="flex items-center gap-0.5"
					><Clock size="14" strokeWidth="2" /> {timeDifference(post.time)}</span
				>
			</div>
		</a>
	</div>
</div>
