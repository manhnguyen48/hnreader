import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
	databaseURL: 'https://hacker-news.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export const getHNPost = async (id: number) => {
	try {
		const snapshot = await get(child(ref(db), `v0/item/${id}`));
		return snapshot.val();
	} catch (error) {
		console.error(`Failed to get post ${id}`, error);
		return null;
	}
};

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

export const isFulfilled = <PostData>(
	p: PromiseSettledResult<PostData>
): p is PromiseFulfilledResult<PostData> => p.status === 'fulfilled';
