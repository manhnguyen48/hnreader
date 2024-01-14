<script lang="ts">
	import '../app.postcss';

	import ThemeSwitch from '$lib/components/themeSwitch.svelte';
	import Footer from '$lib/components/footer.svelte';
	import MenuBar from '$lib/components/menuBar.svelte';
</script>

<main class="min-h-screen">
	<div class="navbar bg-base-100 text-base-content justify-between">
		<h1
			class="text-3xl md:text-5xl font-mono mx-0.5 bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>
			<a href="/">HackerNews</a>
		</h1>
		<ThemeSwitch />
	</div>
	<!-- Reverse the order so nav bar at bottom on mobile -->
	<div class="w-full grow flex flex-col md:flex-col-reverse">
		<MenuBar />
		<slot class="order-1 md:order-2 overflow-auto" />
	</div>
</main>
<Footer />
