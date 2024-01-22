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

export const PossibleFeeds: string[] = ['top', 'best', 'new', 'ask', 'show'];
export const PossibleThemes: string[] = ['true', 'false'];
export const timeOptions: string[] = ['All Time', 'Past Week', 'Past Month'];
export const numberResults: number[] = [20, 30, 50, 100];
