<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	const feeds: string[] = ['top', 'new', 'best', 'ask', 'show', 'job'];
	const themes: string[] = [
		'light',
		'dark',
		'emerald',
		'cyberpunk',
		'valentine',
		'retro',
		'garden',
		'forest',
		'aqua',
		'winter',
		'sunset'
	];
	let theme: Writable<string> = writable('light');
	onMount(() => {
		theme.subscribe((value) => {
			document.body.setAttribute('data-theme', value);
		});
	});
</script>

<div class="flex top-0 justify-between items-center h-16 p-4">
	<h1
		class="text-4xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
	>
		<a href="/">HackerNews</a>
	</h1>

	<div>
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn m-1">
				Theme
				<svg
					width="12px"
					height="12px"
					class="h-2 w-2 fill-current opacity-60 inline-block"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 2048 2048"
					><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
				>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content z-[2] shadow-2xl bg-base-300 rounded-box">
				{#each themes as themeName}
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							class="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
							aria-label={themeName}
							value={themeName}
							bind:group={$theme}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
<!-- Reverse the order so nav bar at bottom on mobile -->
<div class="w-full flex flex-col md:flex-col-reverse">
	<div
		role="tablist"
		class="tabs tabs-boxed order-2 md:order-1 justify-even md:justify-center sticky bottom-0 md:top-0 bg-base-200 z-[1]"
	>
		{#each feeds as feedName}
			<a
				href="/{feedName}"
				role="tab"
				class="tab {$page.url.pathname === `/${feedName}` ? 'tab-active' : ''}"
			>
				<span class="capitalize">{feedName}</span>
			</a>
		{/each}
	</div>
	<slot class="order-1 md:order-2 overflow-auto" />
</div>
