import type { Handle } from '@sveltejs/kit';
import { PossibleThemes } from '$lib/types';

/**
 * Handles server side rendering for setting the theme cookie.
 * Checks if a 'theme' cookie is set, and if not defaults to the 'retro' theme.
 * If the theme is invalid, also defaults to 'retro'.
 * Returns the SvelteKit response, transforming the HTML to set the theme colors.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme');

	if (!theme || !PossibleThemes.includes(theme)) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => {
				return html
					.replace('data-theme=""', 'data-theme="retro"')
					.replace('content=""', 'content="#ece3ca"');
			}
		});
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html
				.replace('data-theme=""', `data-theme="${theme ? 'black' : 'retro'}"`)
				.replace('content=""', `content="${theme ? '#000000' : '#ece3ca'}"`);
		}
	});
};
