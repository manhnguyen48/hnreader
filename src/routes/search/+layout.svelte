<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let inputTerm: string;
	let finalTerm: string;

	const updateSearchQuery = (event: Event) => {
		finalTerm = inputTerm.trim();
		goto(`?query=${encodeURIComponent(finalTerm)}`);
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			updateSearchQuery(event);
		}
	};
</script>

<div class="w-full flex sticky top-0 backdrop-blur-md justify-center items-center px-4">
	<a href="/">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
			/>
		</svg>
	</a>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form class="flex justify-center w-full m-2" on:keydown={handleKeyDown}>
		<input
			type="search"
			aria-label="search-box"
			autocomplete="off"
			id="search-term"
			placeholder="Search HackerNews"
			class="input input-bordered rounded-2xl w-4/5 md:w-1/2"
			bind:value={inputTerm}
		/>
	</form>
</div>
<div class="h-full">
	{#key $page.url.searchParams}
		<slot />
	{/key}
</div>
