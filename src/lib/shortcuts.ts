import { goto } from '$app/navigation';
/**
 * Handles keyboard shortcuts when shift key is pressed.
 * Checks for specific keys pressed and navigates to the
 * associated route. Prevents default browser behavior.
 */
export function navShortcut(event: KeyboardEvent) {
	if (event.shiftKey) {
		event.preventDefault();
		let key: string = event.key.toLowerCase();
		switch (key) {
			case 'n':
				goto('/new');
				break;
			case 'b':
				goto('/best');
				break;
			case 't':
				goto('/top');
				break;
			case 's':
				goto('/show');
				break;
			case 'a':
				goto('/ask');
				break;
		}
	}
}

/**
 * Handles the keyboard shortcut to navigate to the search page.
 * When the user presses Ctrl+K, it will prevent the default browser behavior,
 * and navigate to the /search route instead.
 */
export function searchPageShortcut(event: KeyboardEvent) {
	if (event.ctrlKey && event.key.toLowerCase() === 'k') {
		event.preventDefault();
		goto('/search');
	}
}
