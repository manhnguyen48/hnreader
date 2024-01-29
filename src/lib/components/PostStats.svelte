<script lang="ts">
	import { ArrowUp, MessageSquare, Clock } from 'lucide-svelte';
	import { timeDifference } from '$lib/utils';

	export let score: number;
	export let descendants: null | number;
	export let time: number;
	export let by: null | string = null;
</script>

<div class="flex items-center gap-3 font-mono text-xs font-light">
	{#if by}
		<span class="flex items-center rounded-md bg-neutral p-1 text-neutral-content">by: {by}</span>
	{/if}
	<span class="flex items-center gap-0.5"><ArrowUp size="14" strokeWidth="2" /> {score}</span>
	<span class="flex items-center gap-0.5"
		><MessageSquare size="14" strokeWidth="2" /> {descendants ?? 0}</span
	>
	<span class="flex items-center gap-0.5"
		><Clock size="14" strokeWidth="2" /> {timeDifference(time)}</span
	>
</div>
