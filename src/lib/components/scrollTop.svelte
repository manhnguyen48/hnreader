<script lang="ts">
	import { ChevronsUp } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let showButton = false;
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	onMount(() => {
		window.onscroll = () => {
			showButton = window.scrollY > 200;
		};
	});
</script>

<button
	class="btn btn-square fixed bottom-28 right-4 items-center justify-center rounded-lg"
	aria-label="Scroll To Top"
	on:click={scrollToTop}
	style="display: {showButton ? 'flex' : 'none'}"
>
	<ChevronsUp size="28" />
</button>
