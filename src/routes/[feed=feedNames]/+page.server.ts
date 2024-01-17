import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import type { PageServerLoad } from './$types';

const firebaseConfig = {
	databaseURL: 'https://hacker-news.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Function to query a single post given an ID
const getPost = async (id: number) => {
	const snapshot = await get(child(ref(db), `v0/item/${id}`));
	return snapshot.val();
};

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const feed = params.feed + 'stories';
	const snapshot = await get(child(ref(db), `v0/${feed}`));

	if (snapshot.exists()) {
		const postIds = snapshot.val();
		const posts = await Promise.allSettled(postIds.map(getPost)); 
		// Cache data so we don't query the server too much
		setHeaders({
			'cache-control': 'public, max-age=120, must-revalidate'
		});
		return { posts: posts.map(p => p.status === 'fulfilled' ? p.value : null) };
	} else {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}
};
