export type PostData = {
	id: number;
	by: string;
	descendants: number;
	text?: string;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
};

export type Comment = {
	by?: string;
	id: number;
	kids: [] | number[];
	parent: number;
	text: string;
	time: number;
	type: string;
};

export const PossibleFeeds: string[] = ['top', 'best', 'new', 'ask', 'show'];
export const PossibleThemes: string[] = ['true', 'false'];
export const timeOptions: string[] = ['All Time', 'Past Week', 'Past Month'];
export const numberResults: number[] = [20, 30, 50, 100];
