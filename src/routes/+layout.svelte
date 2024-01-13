<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import github from '$lib/assets/github.svg?raw';
	import linkedin from '$lib/assets/linkedin.svg?raw';
	import twitter from '$lib/assets/twitter.svg?raw';

	const feeds: string[] = ['top', 'best', 'new', 'ask', 'show', 'job'];
	let theme: Writable<boolean>;
	onMount(() => {
		theme = writable(Boolean(localStorage.getItem('theme')) || false);
		theme.subscribe((value) => {
			localStorage.setItem('theme', String(value));
			document.documentElement.dataset['theme'] = value ? 'forest' : 'cmyk'
		});
	});
</script>

<main class = "min-h-screen">
<div class="navbar bg-base-100 text-base-content justify-between">
	<h1
		class="text-3xl md:text-5xl font-medium mx-0.5 bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
	>
		<a href="/">HackerNews</a>
	</h1>
	<div class="dropdown dropdown-bottom dropdown-end px-1">
		<label class="swap swap-rotate m-1">
			<!-- this hidden checkbox controls the state -->
			<input type="checkbox" class="theme-controller" bind:checked={$theme} />
			<!-- sun icon -->
			<svg
				class="swap-on fill-current w-8 h-8"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/></svg
			>
			<!-- moon icon -->
			<svg
				class="swap-off fill-current w-8 h-8"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/></svg
			>
		</label>
	</div>
</div>
<!-- Reverse the order so nav bar at bottom on mobile -->
<div class="w-full grow flex flex-col md:flex-col-reverse">
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
</main>
<footer
	class="footer flex items-center justify-between bg-base-300 text-base-content px-4 py-2 h-12 top-3/4"
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
