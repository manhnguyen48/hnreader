<script lang="ts">
	import MenuBar from '$lib/components/MenuBar.svelte';
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- Reverse the layout so on smaller screens, menu bar is bottom -->
<div class="flex h-full w-full flex-col-reverse md:flex-col">
	<div class="sticky bottom-0 z-[1] min-h-fit flex-1 backdrop-blur-md md:top-0">
		<MenuBar />
	</div>
	<div class="min-h-screen flex-1">
		{#key page.params}
			{@render children?.()}
		{/key}
	</div>
</div>
