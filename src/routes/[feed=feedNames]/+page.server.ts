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
const getHNPost = async (id: number) => {
	try {
		const snapshot = await get(child(ref(db), `v0/item/${id}`));
		return snapshot.val();
	} catch (error) {
		console.error(`Failed to get post ${id}`, error);
		return null;
	}
};

let cachedPostIds = []

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const feed = params.feed + 'stories';
	let snapshot;
	try {
		snapshot = await get(child(ref(db), `v0/${feed}`));
	} catch (error) {
		console.error('Failed to get feed:', error);
		return {
			status: 500,
			error: new Error('Internal server error')
		};
	}
	if (snapshot.exists()) {
		cachedPostIds = snapshot.val()
		const posts = await Promise.allSettled(cachedPostIds.slice(0,50).map(getHNPost));
		// Cache data so we don't query the server too much
		setHeaders({
			'cache-control': 'public, max-age=120, must-revalidate'
		});
		return { 
			postIds: cachedPostIds, 
			posts: posts.map((p) => (p.status === 'fulfilled' ? p.value : null)) };
	} else {
		return {
			status: 404,
			error: new Error('Feed not found')
		};
	}
};

