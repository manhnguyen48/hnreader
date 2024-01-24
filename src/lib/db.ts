import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

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
// Recursive function to get comments of a post
export const getComments = async (kids: number[]): Promise<any[]> => {
	if (!kids) {
	  return [];
	}
  
	const commentsPromises = kids.map(getItem);
	const commentsResults = await Promise.allSettled(commentsPromises);
  
	const comments = commentsResults
	  .filter(isFulfilled)
	  .map(result => result.value);
  
	for (const comment of comments) {
	  if (comment.kids) {
		comment.kids = await getComments(comment.kids);
	  }
	}
  
	return comments;
  };
  

export const isFulfilled = <PostData>(
	p: PromiseSettledResult<PostData>
): p is PromiseFulfilledResult<PostData> => p.status === 'fulfilled';
