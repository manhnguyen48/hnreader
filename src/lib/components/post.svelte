<script lang="ts">
	import type { PostData } from '$lib/types';
	import upArrow from '$lib/assets/up-arrow-icon.svg?raw';
	import clockIcon from '$lib/assets/clock-icon.svg?raw';
	import messageIcon from '$lib/assets/message-icon.svg?raw';
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	// import bookmarkIconBlank from '$lib/assets/bookmark-icon-blank.svg?raw';
	// import bookmarkIconFilled from '$lib/assets/bookmark-icon-filled.svg?raw';

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
	class="shadow-xl rounded-2xl p-2 min-h-[32] flex flex-col gap-2 md:gap-4 justify-between content-around border border-solid border-neutral hover:border-success select-none break-words"
	transition:scale={{ duration: 500, delay: 500, easing: expoInOut }}
>
	<a
		href={post.url ? post.url : `https://news.ycombinator.com/item?id=${post.id}`}
		target="_blank"
		rel="noopener noreferrer"
		class="hover:underline underline-offset-4 visited:text-indigo-400 px-1"
	>
		<header class="text-base">{post.title}</header>
		<span class="text-xs font-light">{post.url ? `(${new URL(post.url).hostname})` : ''}</span>
	</a>
	<div class="flex justify-end items-center px-1">
		<!-- <label class="swap">
			<input type="checkbox" name="save" id="test" bind:checked={savedPost} />
			{@html bookmarkIconFilled}
			{@html bookmarkIconBlank}
		</label> -->
		<a
			href="https://news.ycombinator.com/item?id={post.id}"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:bg-neutral hover:text-neutral-content rounded-md"
		>
			<div class="flex items-end justify-between text-xs gap-2 px-1 font-mono font-light">
				<span class="flex items-center gap-0.5">{@html upArrow} {post.score}</span>
				<span class="flex items-center gap-0.5"
					>{@html messageIcon} {post.kids ? post.kids.length : 0}</span
				>
				<span class="flex items-center gap-0.5">{@html clockIcon} {timeDifference(post.time)}</span>
			</div>
		</a>
	</div>
</div>
