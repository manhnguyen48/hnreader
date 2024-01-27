<script lang="ts">
	import PostDetail from '$lib/components/PostDetail.svelte';
	import Comment from '$lib/components/Comment.svelte';
	export let data;
	// grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 xl:grid-cols-3
</script>

<div class="flex w-full flex-col items-start justify-center gap-8 md:px-6">
	<PostDetail post={data.post} />
	{#if data.comments}
		<div class="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
			{#await data.comments then comments}
				{#each comments as comment}
					<Comment {comment} />
				{/each}
			{/await}
		</div>
	{/if}
</div>
