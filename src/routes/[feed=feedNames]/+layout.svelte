<script lang="ts">
	import MenuBar from '$lib/components/menuBar.svelte';
</script>

<!-- Reverse the layout so on smaller screens, menu bar is bottom -->
<div class="flex h-full w-full flex-col-reverse md:flex-col">
	<div class="sticky bottom-0 z-[1] flex-1 backdrop-blur-md md:top-0">
		<MenuBar />
	</div>
	<div class="min-h-screen flex-1 overflow-auto">
		<slot />
	</div>
</div>
