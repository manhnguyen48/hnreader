import DOMPurify from 'dompurify';

export function sanitiseHTML(input: string): string {
	const output = DOMPurify.sanitize(input);
	return output;
}

export function timeDifference(previous: number): string {
	const units = [
		{ name: 's', value: 1 },
		{ name: 'm', value: 60 },
		{ name: 'h', value: 60 * 60 },
		{ name: 'd', value: 60 * 60 * 24 },
		{ name: 'M', value: 60 * 60 * 24 * 30 },
		{ name: 'Y', value: 60 * 60 * 24 * 365 }
	];
	const elapsed = Date.now() / 1000 - previous;

	for (let i = units.length - 1; i >= 0; i--) {
		if (elapsed >= units[i].value) {
			return Math.round(elapsed / units[i].value) + units[i].name;
		}
	}
	return 'now';
}

export function capitalise(s: string): string {
	return s[0].toUpperCase() + s.slice(1);
}
