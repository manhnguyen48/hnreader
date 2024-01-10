<script lang="ts">
	import type { PostData } from '$lib/types';
	import upArrow from '$lib/assets/up-arrow-icon.svg?raw';
	import clockIcon from '$lib/assets/clock-icon.svg?raw';
	import messageIcon from '$lib/assets/message-icon.svg?raw';
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
	class="card shadow-xl p-2 min-h-[32] flex flex-col justify-between content-around border border-solid border-neutral"
>
	<a
		href={post.url ? post.url : `https://news.ycombinator.com/item?id=${post.id}`}
		target="_blank"
		rel="noopener noreferrer"
		class="hover:underline visited:text-indigo-400"
	>
		<header class="text-sm md:text-base font-medium">{post.title}</header>
		<span class="text-xs">{post.url ? `(${new URL(post.url).hostname})` : ''}</span>
	</a>
	<div class="flex flex-col gap-1 justify-between items-end">
		<span class="italic text-xs"
			><a
				href="http://news.ycombinator.com/user?id={post.by}"
				target="_blank"
				rel="noopener noreferrer">by {post.by}</a
			></span
		>
		<div class="flex items-end justify-between text-xs gap-2">
			<span class="flex items-center gap-0.5">{@html upArrow} {post.score}</span>
			<a
				href="https://news.ycombinator.com/item?id={post.id}"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="flex items-center gap-0.5">{@html messageIcon} {post.kids ? post.kids.length : 0}</span
				>
			</a>

			<span class="flex items-center gap-0.5">{@html clockIcon} {timeDifference(post.time)}</span>
		</div>
	</div>
</div>
