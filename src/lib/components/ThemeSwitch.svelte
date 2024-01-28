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
			document.cookie = `theme=${value}; max-age=${60 * 60 * 24 * 365}; SameSite=Strict; Path="/"`;
			document.documentElement.dataset['theme'] = value ? 'black' : 'retro';
			const metaThemecolor = document.querySelector('meta[name=theme-color]');
			metaThemecolor?.setAttribute('content', value ? '#000000' : '#ece3ca');
		});
	});
</script>

<label class="swap swap-rotate mr-2">
	<input
		type="checkbox"
		role="switch"
		id="theme-switch"
		class="theme-controller"
		aria-label="Theme switch"
		bind:checked={$theme}
	/>
	<Sun size="20" class="swap-on" />
	<Moon size="20" class="swap-off" />
</label>
