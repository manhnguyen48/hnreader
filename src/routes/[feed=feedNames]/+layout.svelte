<script lang="ts">
	import MenuBar from '$lib/components/menuBar.svelte';
</script>

<!-- Reverse the layout so on smaller screens, menu bar is bottom -->
<div class="flex h-full w-full flex-col md:flex-col-reverse">
	<div class="sticky bottom-0 z-[1] order-2 backdrop-blur-md md:top-0 md:order-1">
		<MenuBar />
	</div>
	<slot class="order-1 overflow-auto md:order-2" />
</div>
