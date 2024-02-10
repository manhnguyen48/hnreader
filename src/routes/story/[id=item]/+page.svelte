<script lang="ts">
	import PostDetail from '$lib/components/PostDetail.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>
<div class="flex w-full flex-col items-start justify-center gap-8 md:px-6">
	<!-- Possibly get a comment instead of post -->
	{#if data.post.type === 'comment'}
		<Comment comment={data.post} />
		<!-- If we get a post then render it normally -->
	{:else if data.post.type === 'story'}
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
	{/if}
</div>
