import type { PageLoad } from '../$types';

export const ssr = false;

export const load: PageLoad = async ({ url, fetch }) => {
	const params = new URLSearchParams(url.search);
	const queryString = params.get('query');
	if (queryString) {
		const resp = await fetch(`/api/${queryString}`, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		return {
			results: resp.json()
		};
	}
};
