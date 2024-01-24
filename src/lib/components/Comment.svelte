<script lang="ts">
    export let comment: any; 
    export let indent = 0;
</script>

{#if comment}
    <div class=" flex flex-wrap border border-neutral rounded-2xl p-2" 
    style = "margin-left: {indent}px">
    <div class="prose">{@html comment.text}</div>
</div>
    {#if comment.kids}
        {#each comment.kids as kid (kid.id)}
            <svelte:self comment={kid} indent = {indent + 30}></svelte:self>
        {/each}
    {/if}
{:else if comment.deleted} 
<p>deleted</p>
{/if}