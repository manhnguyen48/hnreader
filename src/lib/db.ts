import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import type { HNItem } from '$lib/types';

const firebaseConfig = {
	databaseURL: 'https://hacker-news.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Function to get an array of post IDs in a feed
export const getPostIds = async (feed: string) => {
	let snapshot;
	try {
		snapshot = await get(child(ref(db), `v0/${feed}`));
	} catch (error) {
		console.error('Failed to get feed:', error);
		return null;
	}
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		return null;
	}
};
// Function to get a single item
export const getItem = async (id: number) => {
	try {
		const snapshot = await get(child(ref(db), `v0/item/${id}`));
		return snapshot.val();
	} catch (error) {
		console.error(`Failed to get post ${id}`, error);
		return null;
	}
};
// Function to get comments of a post
export const getComments = async (kids: number[]): Promise<[] | HNItem[]> => {
	if (!kids) {
		return [];
	}
	const comments: HNItem[] = (await Promise.allSettled(kids.map(getItem)))
		.filter(isFulfilled)
		.map((result) => result.value);
	return comments;
};

export const isFulfilled = <HNItem>(
	p: PromiseSettledResult<HNItem>
): p is PromiseFulfilledResult<HNItem> => p.status === 'fulfilled';
