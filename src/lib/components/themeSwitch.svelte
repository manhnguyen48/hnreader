<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'lucide-svelte';
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
			document.documentElement.dataset['theme'] = value ? 'black' : 'retro';
			const metaThemecolor = document.querySelector('meta[name=theme-color]');
			metaThemecolor?.setAttribute('content', value ? '#000000' : '#ffffff');
		});
	});
</script>

<div class="dropdown dropdown-end dropdown-bottom px-1">
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
		<Sun size="20" class="swap-on" />
		<!-- moon icon -->
		<Moon size="20" class="swap-off" />
	</label>
</div>
