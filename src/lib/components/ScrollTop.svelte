<script lang="ts">
	import { ChevronsUp } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	let showButton = $state(false);
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	let scrollHandler: EventListener;
	onMount(() => {
		if (browser) {
			let lastScrollY = window.scrollY;
			let ticking = false;
			scrollHandler = () => {
				lastScrollY = window.scrollY;
				if (!ticking) {
					window.requestAnimationFrame(() => {
						showButton = lastScrollY > 200;
						ticking = false;
					});
					ticking = true;
				}
			};
			window.addEventListener('scroll', scrollHandler);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', scrollHandler);
		}
	});
</script>

<button
	class="btn btn-square fixed bottom-28 right-4 items-center justify-center rounded-lg"
	aria-label="Scroll To Top"
	onclick={scrollToTop}
	style="display: {showButton ? 'flex' : 'none'}"
>
	<ChevronsUp size="28" />
</button>
