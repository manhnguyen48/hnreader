<script lang="ts">
	import { page } from '$app/stores';
	const feeds: string[] = ['new', 'best', 'top', 'show', 'ask'];
</script>

<ul
	class="menu menu-horizontal justify-evenly md:justify-center order-2 md:order-1 sticky bottom-0 md:top-0 z-[1] backdrop-blur-md"
>
	{#each feeds as feedName}
		<li>
			<a
				href="/{feedName}"
				class="rounded-xl {$page.url.pathname === `/${feedName}`
					? 'active font-medium'
					: 'font-light'}"
			>
				<span class="text-sm md:text-base w-8 flex justify-center capitalize">{feedName}</span>
			</a>
		</li>
	{/each}
</ul>
