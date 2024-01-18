<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft } from 'lucide-svelte';

	let inputTerm: string = '';

	const updateSearchQuery = () => {
		goto(`?query=${encodeURIComponent(inputTerm.trim())}`, { keepFocus: true });
	};
</script>

<div
	class="sticky top-0 flex w-full items-center justify-evenly backdrop-blur-md md:justify-center"
>
	<a href="/" aria-label="Back to Homepage" class="btn btn-ghost rounded-2xl">
		<ArrowLeft strokeWidth="1.5" />
	</a>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form class="flex w-4/5 justify-center py-2">
		<input
			type="search"
			aria-label="search-box"
			autocomplete="off"
			id="query"
			placeholder="Search HackerNews"
			class="input input-bordered w-[90%] rounded-2xl"
			on:input={() => setTimeout(updateSearchQuery, 200)}
			on:keydown={() => setTimeout(updateSearchQuery, 200)}
			bind:value={inputTerm}
		/>
	</form>
</div>

<slot />
