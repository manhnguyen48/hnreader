<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { browser } from '$app/environment'; // Import browser check for safe DOM/window access

	// 1. Determine the initial theme value on the client-side
	// Default to light mode (false) if run during SSR or if checks fail
	let initialTheme = false;
	if (browser) {
		const preferDarkmode =
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		const cookies = document.cookie.split(';');
		const themeCookie = cookies.find((cookie) => cookie.trim().startsWith('theme='));

		if (themeCookie) {
			// Use cookie value if present
			initialTheme = themeCookie.split('=')[1] === 'true';
		} else {
			// Otherwise, use system preference (defaulting to false if matchMedia fails)
			initialTheme = preferDarkmode ?? false;
		}
	}

	// 2. Declare reactive state using $state, initialized with the value determined above
	// 'theme' is true if dark mode is active, false if light mode is active.
	let theme = $state(initialTheme);

	// 3. Use $effect for side effects that depend on the 'theme' state
	$effect(() => {
		// This code runs after the component mounts and whenever 'theme' changes.
		// It's guaranteed to run client-side where 'document' is available.
		if (!browser) return; // Extra safety, though $effect runs client-side

		// Update the theme cookie
		document.cookie = `theme=${theme}; max-age=${60 * 60 * 24 * 365}; SameSite=Strict; Path=/`; // 1 year expiry

		// Update the data attribute on the <html> element for CSS targeting
		// Uses your theme names: 'black' for dark, 'retro' for light
		document.documentElement.dataset['theme'] = theme ? 'black' : 'retro';

		// Update the meta theme-color tag for browser UI theming
		const metaThemecolor = document.querySelector('meta[name=theme-color]');
		// Uses your theme colors: #000000 for dark, #ece3ca for light
		metaThemecolor?.setAttribute('content', theme ? '#000000' : '#ece3ca');

		// Note: No need to return an unsubscribe function, $effect handles cleanup.
	});
</script>

<label class="swap swap-rotate mr-2">
	<input
		type="checkbox"
		role="switch"
		id="theme-switch"
		class="theme-controller"
		aria-label="Theme switch"
		bind:checked={theme}
	/>
	<Sun size="20" class="swap-on" />
	<Moon size="20" class="swap-off" />
</label>
