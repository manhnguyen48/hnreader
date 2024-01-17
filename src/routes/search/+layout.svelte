<script lang="ts">
	import { goto } from '$app/navigation';

	let inputTerm: string = '';

	const updateSearchQuery = () => {
		goto(`?query=${encodeURIComponent(inputTerm.trim())}`, { keepFocus: true });
	};
</script>

<div
	class="w-full flex sticky top-0 backdrop-blur-md justify-evenly md:justify-center items-center"

>
	<a href="/" aria-label="Back to Homepage" class="btn btn-ghost rounded-2xl">
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
	<form class="flex justify-center w-4/5 py-2">
		<input
			type="search"
			aria-label="search-box"
			autocomplete="off"
			id="query"
			placeholder="Search HackerNews"
			class="input input-bordered rounded-2xl w-[90%]"
			on:input={() => setTimeout(updateSearchQuery, 0)}
			on:keydown={() => setTimeout(updateSearchQuery, 0)}
			bind:value={inputTerm}
		/>
	</form>
</div>

<slot />
