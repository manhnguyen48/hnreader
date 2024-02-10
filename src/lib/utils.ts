import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML input using DOMPurify.
 *
 * @param input - HTML input to sanitize
 * @returns Sanitized HTML output
 */
export function sanitiseHTML(input: string): string {
	const output = DOMPurify.sanitize(input);
	return output;
}

/**
 * Calculates a human readable time difference string from a provided previous timestamp.
 * @param previous - Unix seconds timestamps
 * @return A string representing the time elapsed since the provided previous timestamp.
 *
 * Converts the time elapsed since the provided previous timestamp into the largest unit
 * that results in a non-zero value, with units going from seconds to minutes to hours to
 * days to months to years.
 */
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

/**
 * Capitalizes the first letter of a string.
 *
 * @param s - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalise(s: string): string {
	return s[0].toUpperCase() + s.slice(1);
}
