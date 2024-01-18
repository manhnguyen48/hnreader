<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft } from 'lucide-svelte';

	let inputTerm: string = '';

	const updateSearchQuery = () => {
		goto(`?query=${encodeURIComponent(inputTerm.trim())}`, { keepFocus: true });
	};
</script>

<div class="flex h-full w-full flex-col md:flex-col-reverse">
	<div
		class="sticky bottom-0 order-2 flex w-full items-center justify-evenly backdrop-blur-md md:top-0 md:order-1 md:justify-center"
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
				autocorrect="false"
				id="query"
				placeholder="Search HackerNews"
				class="input input-bordered w-[90%] rounded-2xl"
				on:input={() => setTimeout(updateSearchQuery, 200)}
				on:keydown={() => setTimeout(updateSearchQuery, 200)}
				bind:value={inputTerm}
			/>
		</form>
	</div>

	<slot class="order-1 overflow-auto md:order-2" />
</div>
