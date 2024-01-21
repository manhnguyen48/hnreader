export type PostData = {
	by: string;
	descendants: number;
	id: number;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
};

export const PossibleFeeds: string[] = ['top', 'best', 'new', 'ask', 'show']