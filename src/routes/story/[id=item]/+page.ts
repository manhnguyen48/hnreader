import { getComments, getItem } from '$lib/db';
import type { PostData } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const postID: number = parseInt(params.id);
	const postContent: PostData = await getItem(postID);
	return {
		post: postContent,
		comments: getComments(postContent.kids)
	};
};
