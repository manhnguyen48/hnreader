import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;
export const load: PageLoad = () => {
	return redirect(302, '/top');
};
