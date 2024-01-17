import type { PageLoad } from '../$types';

export const ssr = false;

export const load: PageLoad = async ({ url, fetch }) => {
	const params = new URLSearchParams(url.searchParams);
	const queryString = params.get('query');

	if (!queryString) {
		return {
			status: 400,
			error: new Error('Missing required parameter: query')
		};
	}

	const resp = await fetch(`/api/${queryString}`, {
		method: 'GET',
		headers: { 'content-type': 'application/json' }
	});
	return {
		results: resp.json()
	};
};
