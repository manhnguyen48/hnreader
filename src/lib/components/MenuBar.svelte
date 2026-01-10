<script lang="ts">
	import { page } from '$app/state';
	const feeds: string[] = ['new', 'best', 'top', 'show', 'ask'];
	import { navShortcut } from '$lib/shortcuts';
</script>

<svelte:window onkeydown={navShortcut} />
<ul class="menu menu-horizontal">
	{#each feeds as feedName}
		<li>
			<a
				href="/{feedName}"
				class="rounded-xl {page.url.pathname === `/${feedName}`
					? 'active font-medium'
					: 'font-light'}"
			>
				<span class="flex w-8 justify-center text-sm capitalize md:text-base">{feedName}</span>
			</a>
		</li>
	{/each}
</ul>
