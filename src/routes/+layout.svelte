<script lang="ts">
	import '../app.postcss';

	import ThemeSwitch from '$lib/components/themeSwitch.svelte';
	import Footer from '$lib/components/footer.svelte';
	import searchIcon from '$lib/assets/search-icon.svg?raw';
	import { page } from '$app/stores';
</script>

<main class="min-h-screen">
	<div class="navbar justify-between bg-base-100 text-base-content">
		<h1
			class="mx-0.5 bg-gradient-to-br from-red-500 to-yellow-500 box-decoration-clone bg-clip-text font-mono text-3xl text-transparent md:text-5xl"
		>
			<a href="/">HackerNews</a>
		</h1>
		<div>
			{#if $page.url.pathname !== '/search'}
				<a
					href="/search"
					rel="noopenner noreferrer"
					aria-label="Search"
					class="btn btn-ghost rounded-2xl"
				>
					{@html searchIcon}
				</a>
			{/if}
			<ThemeSwitch />
		</div>
	</div>
	<slot />
</main>
<Footer />
