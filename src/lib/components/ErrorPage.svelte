<script lang="ts">
	import cryingCat from '$lib/assets/crying-cat.gif';
	export let errorText: string;
</script>

<div class="flex h-screen w-full flex-col items-center justify-center gap-2">
	<p class="text-4xl">{errorText}</p>
	<img src={cryingCat} alt="Cat crying" width="40%" height="40%" />
</div>
