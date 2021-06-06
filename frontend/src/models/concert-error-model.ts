export interface ConcertErrorModel{
	name?: boolean;
	artistName?: boolean;
	genre?: boolean;
	location?: boolean;
	description?: boolean;
	date?: boolean;
	tickets?: number[];
	imgPath?: boolean;
}

export interface ErrorModel{
	error: boolean;
	helperText: string;
}
