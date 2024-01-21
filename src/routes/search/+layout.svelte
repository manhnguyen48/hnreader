<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	// Debounce the input by 500ms
	let timeout: number | undefined;
	const handleSearch = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const form = target.parentElement as HTMLFormElement;
		if (timeout !== undefined) {
			clearTimeout(timeout);
		}
		timeout = window.setTimeout(() => {
			form?.requestSubmit();
		}, 500);
	};
	const focusSearch = (el: HTMLInputElement) => el.focus();
</script>

<div
	class="sticky top-0 flex w-full items-center justify-evenly backdrop-blur-md md:justify-center"
>
	<button
		on:click={() => history.back()}
		aria-label="Back to previous"
		class="btn btn-ghost rounded-2xl"
	>
		<ArrowLeft strokeWidth="1.5" />
	</button>
	<form class="flex w-4/5 justify-center py-2" data-sveltekit-keepfocus data-sveltekit-replacestate>
		<input
			type="search"
			aria-label="search-box"
			autocomplete="off"
			autocorrect="false"
			name="query"
			placeholder="Search HackerNews"
			class="input input-bordered w-[90%] rounded-2xl"
			on:input={handleSearch}
			use:focusSearch
		/>
	</form>
</div>

<slot />
