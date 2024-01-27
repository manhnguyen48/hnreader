import { getComments, getItem } from '$lib/db';
import type { Comment, PostData } from '$lib/types';
import type { PageLoad } from './$types';

export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	const postID: number = parseInt(params.id);
	const postContent: PostData = await getItem(postID);
	let comments: [] | Promise<[] | Comment[]> = [];
	if (postContent.kids) {
		comments = getComments(postContent.kids.slice(0, 50));
	}
	return {
		post: postContent,
		comments: comments
	};
};