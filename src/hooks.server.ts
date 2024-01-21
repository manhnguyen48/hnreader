import type { Handle } from '@sveltejs/kit';
import { PossibleThemes } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme');

	if (!theme || !PossibleThemes.includes(theme)) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html
				.replace('data-theme=""', `data-theme="${theme ? 'black' : 'retro'}"`)
				.replace('content=""', `content="${theme ? '#000000' : '#ece3ca'}"`);
		}
	});
};
