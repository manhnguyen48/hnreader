import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import type { HNItem } from '$lib/types';

const firebaseConfig = {
	databaseURL: 'https://hacker-news.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const dbRef = ref(getDatabase(app));
// Function to get an array of post IDs in a feed
/**
 * Fetches post IDs for a given feed from the Firebase Realtime Database.
 *
 * @param feed - The name of the feed to get posts for, e.g. 'topstories'.
 * @returns A promise resolving to an array of post IDs, or null if the feed doesn't exist.
 */
export const getPostIds = async (feed: string) => {
	let snapshot;
	try {
		snapshot = await get(child(dbRef, `v0/${feed}`));
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
interface PostCacheEntry {
	post: HNItem;
	timestamp: number;
}
const postStore: { [key: number]: PostCacheEntry } = {};
// Function to get a single item
/**
 * Fetches a single Hacker News item by its numeric ID.
 *
 * @param id - The numeric ID of the Hacker News item to fetch.
 * @returns The item data, or null if not found.
 */
export const getItem = async (id: number) => {
	// Check cache
	if (postStore[id] && Date.now() - postStore[id].timestamp < 5 * 60 * 1000) {
		return postStore[id].post;
	}
	let snapshot = await get(child(dbRef, `v0/item/${id}`));
	postStore[id] = {
		post: snapshot.val(),
		timestamp: Date.now()
	};
	return postStore[id].post;
};
// Function to get comments of a post
/**
 * Retrieves the comments for the given post IDs.
 *
 * @param kids Array of comment IDs to fetch
 * @returns Promise resolving to array of comment items, or empty array if no comments
 */
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
