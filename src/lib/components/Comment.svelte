<script lang="ts">
	import type { Comment } from '$lib/types';
	import { timeDifference } from '$lib/utils';
	import { sanitiseHTML } from '$lib/utils';
	export let comment: Comment;
</script>

<div class="mb-6 flex-auto">
	<article class="flex flex-col gap-2 border border-transparent border-l-neutral px-2">
		{#if comment && comment.text}
			<div
				class="flex w-fit gap-1 rounded-md bg-neutral p-1 font-mono text-xs text-neutral-content"
			>
				<span>{comment.by}</span>
				<span>&#183</span>
				<span>{timeDifference(comment.time)} ago</span>
			</div>
			<div class="prose prose-base">{@html sanitiseHTML(comment.text)}</div>
		{/if}
	</article>
	<!-- TODO: onclick event to load more comments -->
	{#if comment.kids}
		<button class="btn btn-sm ml-4 mt-8 rounded-xl font-normal">
			&#128898;
			{comment.kids.length}
			more repl{comment.kids.length > 1 ? 'ies' : 'y'}
		</button>
	{/if}
</div>
