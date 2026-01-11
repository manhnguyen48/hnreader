<script lang="ts">
	import { ArrowUp, MessageSquare, Clock } from 'lucide-svelte';
	import { timeDifference } from '$lib/utils';

	interface Props {
		score: number;
		descendants: null | number;
		time: number;
		by?: null | string;
	}

	let { score, descendants, time, by = null }: Props = $props();
</script>

<div class="flex items-center gap-3 font-mono text-xs font-light">
	{#if by}
		<span class="bg-neutral text-neutral-content flex items-center rounded-md p-1">{by}</span>
		<span>&#183</span>
	{/if}
	<span class="flex items-center gap-0.5"><ArrowUp size="14" strokeWidth="2" /> {score}</span>
	<span class="flex items-center gap-0.5"
		><MessageSquare size="14" strokeWidth="2" /> {descendants ?? 0}</span
	>
	<span class="flex items-center gap-0.5"
		><Clock size="14" strokeWidth="2" /> {timeDifference(time)}</span
	>
</div>
