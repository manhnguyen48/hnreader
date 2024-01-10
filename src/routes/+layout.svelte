<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import github from '$lib/assets/github.svg?raw';
	import linkedin from '$lib/assets/linkedin.svg?raw';
	import twitter from '$lib/assets/twitter.svg?raw';

	const feeds: string[] = ['top', 'new', 'best', 'ask', 'show', 'job'];
	const themes: string[] = [
		'light',
		'dark',
		'cyberpunk',
		'valentine',
		'retro',
		'forest',
		'sunset',
		'cmyk',
		'pastel',
		'black'
	];
	let theme: Writable<string>;
	onMount(() => {
		theme = writable(localStorage.getItem('theme') || 'forest');
		theme.subscribe((value) => {
			localStorage.setItem('theme', value);
			document.body.setAttribute('data-theme', value);
		});
	});
</script>

<div class="flex top-0 justify-between items-center h-min p-4">
	<h1
		class="text-4xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
	>
		<a href="/">HackerNews</a>
	</h1>

	<div>
		<div class="dropdown dropdown-bottom dropdown-end">
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
			<ul tabindex="0" class="dropdown-content z-[2] shadow-2xl bg-base-300 rounded-box p-2">
				{#each themes as themeName}
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							class="theme-controller btn btn-sm btn-block btn-ghost justify-center capitalize"
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
	<ul
		class="menu menu-horizontal justify-evenly md:justify-center order-2 md:order-1 sticky bottom-0 md:top-0 bg-base-200 z-[1]"
	>
		{#each feeds as feedName}
			<li>
				<a href="/{feedName}" class={$page.url.pathname === `/${feedName}` ? 'active' : ''}>
					<span class="capitalize">{feedName}</span>
				</a>
			</li>
		{/each}
	</ul>
	<slot class="order-1 md:order-2 overflow-auto" />
</div>

<footer
	class="footer flex items-center justify-between bg-base-300 text-base-content px-4 py-2 h-12"
>
	<p class="text-base">Made by Ethan Nguyen</p>
	<span class="flex items-center gap-2">
		<a
			href="https://github.com/manhnguyen48"
			target="_blank"
			aria-label="GitHub"
			rel="noopener noreferrer"
		>
			{@html github}</a
		>
		<a
			href="https://www.linkedin.com/in/ethannguyen48/"
			target="_blank"
			aria-label="LinkedIn"
			rel="noopener noreferrer"
		>
			{@html linkedin}</a
		>
		<a
			href="https://twitter.com/bananadata48"
			target="_blank"
			aria-label="Twitter"
			rel="noopener noreferrer"
		>
			{@html twitter}</a
		>
	</span>
</footer>
