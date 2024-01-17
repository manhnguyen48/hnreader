<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	let theme: Writable<boolean>; // true if dark, false if light
	onMount(() => {
		const preferDarkmode =
			window.matchMedia && window.matchMedia('(prefer-color-scheme: dark)').matches;
		let themePreference;
		const cookies = document.cookie.split(';');
		const themeCookie = cookies.find((cookie) => cookie.trim().startsWith('theme='));
		if (themeCookie) {
			themePreference = themeCookie.split('=')[1] === 'true';
		} else {
			themePreference = preferDarkmode;
		}
		theme = writable(themePreference);
		theme.subscribe((value) => {
			document.cookie = `theme=${value}; max-age=${60 * 60 * 24 * 365}; SameSite=Strict;`;
			document.documentElement.dataset['theme'] = value ? 'black' : 'cmyk';
			const metaThemecolor = document.querySelector('meta[name=theme-color]');
			metaThemecolor?.setAttribute('content', value ? '#000000' : '#ffffff');
		});
	});
</script>

<div class="dropdown dropdown-bottom dropdown-end px-1">
	<label class="swap swap-rotate m-1">
		<!-- this hidden checkbox controls the state -->
		<input
			type="checkbox"
			id="theme-switch"
			class="theme-controller"
			aria-label="Theme switch"
			bind:checked={$theme}
		/>
		<!-- sun icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="swap-on w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
			/>
		</svg>
		<!-- moon icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="swap-off w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
			/>
		</svg>
	</label>
</div>
