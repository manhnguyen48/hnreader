<script lang="ts">
	import { ArrowUp, MessageSquare, Clock } from 'lucide-svelte';
	import { timeDifference } from '$lib/utils';

	export let score: number;
	export let descendants: null | number;
	export let time: number;
</script>

<div class="flex items-end gap-3 font-mono text-xs font-light">
	<span class="flex items-center gap-0.5"><ArrowUp size="14" strokeWidth="2" /> {score}</span>
	<span class="flex items-center gap-0.5"
		><MessageSquare size="14" strokeWidth="2" /> {descendants ?? 0}</span
	>
	<span class="flex items-center gap-0.5"
		><Clock size="14" strokeWidth="2" /> {timeDifference(time)}</span
	>
</div>
