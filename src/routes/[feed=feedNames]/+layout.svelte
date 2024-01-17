<script lang="ts">
	import MenuBar from '$lib/components/menuBar.svelte';
</script>
<!-- Reverse the layout so on smaller screens, menu bar is bottom -->
<div class="w-full grow flex flex-col md:flex-col-reverse">
	<div class="order-2 md:order-1 backdrop-blur-md sticky bottom-0 md:top-0 z-[1]">
		<MenuBar />
	</div>
	<slot class="order-1 md:order-2 overflow-auto" />
</div>
