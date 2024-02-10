<script lang="ts">
	import { timeOptions, numberResults } from '$lib/types';
	// Debounce the input by 500ms
	let timeout: number | undefined;
	/**
	 * Handles searching when the user types in the search input.
	 * Debounces the input by 400ms to avoid too many requests.
	 * Clears the timeout if a new input comes in before the timeout finishes.
	 */
	const handleSearch = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const form = target.parentElement as HTMLFormElement;
		if (timeout !== undefined) {
			clearTimeout(timeout);
		}
		timeout = window.setTimeout(() => {
			form?.requestSubmit();
		}, 400);
	};
</script>

<div class="sticky top-0 flex w-full items-center backdrop-blur-md md:px-64">
	<form
		class="flex w-full flex-wrap items-center justify-end gap-0.5 p-2 md:flex-nowrap"
		data-sveltekit-keepfocus
		data-sveltekit-replacestate
	>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="search"
			aria-label="search box"
			autocomplete="off"
			autocorrect="false"
			name="q"
			placeholder="Search HackerNews"
			class="input input-bordered w-full rounded-2xl focus:outline-none"
			on:input={handleSearch}
			autofocus
		/>
		<!-- Select the time frame to filter results -->
		<select
			name="t"
			id="time-frame"
			aria-label="time frame"
			class="select select-ghost select-sm rounded-2xl capitalize focus:outline-none"
			on:input={handleSearch}
		>
			{#each timeOptions as timeOption}
				{#if timeOption === 'Past Month'}
					<option value={timeOption} selected>{timeOption}</option>
				{:else}
					<option value={timeOption}>{timeOption}</option>
				{/if}
			{/each}
		</select>
		<!-- Select input to adjust page size -->
		<select
			name="s"
			id="size"
			aria-label="page size"
			class="select select-ghost select-sm rounded-2xl focus:outline-none"
			on:input={handleSearch}
		>
			{#each numberResults as size}
				{#if size === 30}
					<option value={size} selected>{size}</option>
				{:else}
					<option value={size}>{size}</option>
				{/if}
			{/each}
		</select>
	</form>
</div>

<slot />
