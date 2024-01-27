import DOMPurify from 'dompurify';

export function sanitiseHTML(input: string): string {
	const output = DOMPurify.sanitize(input);
	return output;
}

export function timeDifference(previous: number): string {
	const sPerMinute: number = 60;
	const sPerHour: number = sPerMinute * 60;
	const sPerDay: number = sPerHour * 24;
	const sPerMonth: number = sPerDay * 30;
	const sPerYear: number = sPerDay * 365;
	const elapsed: number = Date.now() / 1000 - previous;

	if (elapsed < sPerMinute) {
		return Math.round(elapsed / 1000) + 's';
	} else if (elapsed < sPerHour) {
		return Math.round(elapsed / sPerMinute) + 'm';
	} else if (elapsed < sPerDay) {
		return Math.round(elapsed / sPerHour) + 'h';
	} else if (elapsed < sPerMonth) {
		return Math.round(elapsed / sPerDay) + 'd';
	} else if (elapsed < sPerYear) {
		return Math.round(elapsed / sPerMonth) + 'M';
	} else {
		return Math.round(elapsed / sPerYear) + 'Y';
	}
}
