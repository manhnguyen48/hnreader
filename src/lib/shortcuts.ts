import { goto } from '$app/navigation';
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

export function searchPageShortcut(event: KeyboardEvent) {
	if (event.ctrlKey && event.key.toLowerCase() === 'k') {
		event.preventDefault();
		goto('/search');
	}
}
