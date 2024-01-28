export type HNItem = {
	id: number;
	deleted: boolean;
	type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt';
	by: string;
	time: number;
	text: string;
	dead: boolean;
	parent: number;
	poll: number;
	kids: number[];
	url: string;
	score: number;
	title: string;
	parts: number[];
	descendants: number;
};

export const PossibleFeeds: string[] = ['top', 'best', 'new', 'ask', 'show'];
export const PossibleThemes: string[] = ['true', 'false'];
export const timeOptions: string[] = ['All Time', 'Past Week', 'Past Month'];
export const numberResults: number[] = [20, 30, 50, 100];
