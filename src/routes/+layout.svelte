<script lang="ts">
	import '../app.postcss';

	import ThemeSwitch from '$lib/components/themeSwitch.svelte';
	import Footer from '$lib/components/footer.svelte';
	import searchIcon from '$lib/assets/search-icon.svg?raw';
</script>

<main class="min-h-screen">
	<div class="navbar bg-base-100 text-base-content justify-between">
		<h1
			class="text-3xl md:text-5xl font-mono mx-0.5 bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>
			<a href="/">HackerNews</a>
		</h1>
		<div>
			<a href="/search" rel="noopenner noreferrer" aria-label="Search">
				{@html searchIcon}
			</a>
			<ThemeSwitch />
		</div>
	</div>
	<slot/>
</main>
<Footer />
