<script lang="ts">
	import type { HNItem } from '$lib/types';
	import { timeDifference } from '$lib/utils';
	import { sanitiseHTML } from '$lib/utils';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { getComments } from '$lib/db';
	import { ChevronsDown, ChevronsUp } from 'lucide-svelte';
	export let comment: HNItem;
	export let offset: number = 0;

	let childComments: [] | HNItem[] = [];
	async function getChildComments() {
		childComments = await getComments(comment.kids ? comment.kids : []);
	}
	function collapse() {
		childComments = [];
	}
</script>

<div class="my-2 flex-auto">
	<article
		class="flex flex-col gap-2 border border-transparent border-l-neutral px-2"
		style="margin-left: {offset}px"
		in:slide={{ duration: 100, easing: cubicOut }}
		out:slide={{ duration: 100, easing: cubicIn }}
	>
		{#if comment && comment.text}
			<div
				class="flex w-fit gap-1 rounded-md bg-neutral p-1 font-mono text-xs text-neutral-content"
			>
				<span>{comment.by}</span>
				<span>&#183</span>
				<span>{comment.time ? timeDifference(comment.time) : ''} ago</span>
			</div>
			<div class="prose prose-base text-wrap break-words">
				{@html sanitiseHTML(comment.text)}
			</div>
		{/if}
	</article>
	{#if comment.kids}
		{#if childComments.length === 0}
			<button
				class="btn btn-sm ml-4 mt-4 flex items-center rounded-xl font-normal"
				on:click={getChildComments}
			>
				<ChevronsDown size="16px" />
				{comment.kids.length}
				more repl{comment.kids.length > 1 ? 'ies' : 'y'}
			</button>
		{:else}
			<button class="btn btn-sm ml-4 mt-4 rounded-xl font-normal" on:click={collapse}>
				<ChevronsUp size="16px" />
				Collapse</button
			>
		{/if}
	{/if}
	{#if childComments}
		<div id="child-comments">
			{#each childComments as childComment}
				<svelte:self comment={childComment} offset={offset + 20}></svelte:self>
			{/each}
		</div>
	{/if}
</div>
