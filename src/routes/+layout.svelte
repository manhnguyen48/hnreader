<script lang="ts">
	import '../app.postcss';

	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import ScrollTop from '$lib/components/ScrollTop.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Search } from 'lucide-svelte';
	import { page } from '$app/state';
	import { searchPageShortcut } from '$lib/shortcuts';
	import { onMount } from 'svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('New update available! Reload to update')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onMount(() => detectSWUpdate());
</script>

<svelte:window onkeydown={searchPageShortcut} />
<svelte:head>
	<meta property="og:url" content={page.url.origin + page.url.pathname} />
</svelte:head>
<nav class="navbar justify-between bg-base-100 text-base-content">
	<h1
		class="mx-0.5 bg-gradient-to-br from-red-500 to-yellow-500 box-decoration-clone bg-clip-text font-mono text-3xl text-transparent md:text-5xl"
	>
		<a href="/">HackerNews</a>
	</h1>
	<div>
		{#if page.url.pathname !== '/search'}
			<a
				href="/search"
				rel="noopenner noreferrer"
				aria-label="Search"
				class="btn btn-ghost rounded-2xl"
			>
				<Search strokeWidth="2" size="20" />
			</a>
		{/if}
		<ThemeSwitch />
	</div>
</nav>

<main class="min-h-screen">
	{@render children?.()}
	<ScrollTop />
</main>
<Footer />
