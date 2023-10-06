import { NavigateFunction } from 'react-router-dom';

// interface for the location object
interface Location {
	pathname?: string;
	search?: string;
	state?: {
		from?: {
			pathname: string;
		};
	};
	hash?: string;
	key?: string;
}

// interface for the history object
interface History {
	navigate: NavigateFunction;
	location: Location;
}

// history object
export const history: History = {
	navigate: undefined as unknown as NavigateFunction,
	location: undefined as unknown as Location,
};
