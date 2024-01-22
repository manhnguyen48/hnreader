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
export const timeOptions: string[] = ['all time', 'past week', 'past month'];
export const numberResults: number[] = [20, 30, 50, 100];
