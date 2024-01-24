<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	export let data;
</script>

<div class="w-full md:w-4/5 h-full flex flex-col self-center items-start gap-2 p-4">
    {#if data.comments}
	{#await data.comments then comments}
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	{/await}
{/if}
</div>

