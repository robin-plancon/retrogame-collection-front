import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';
import { axiosInstance } from '../../utils/axios';
import { RootState } from '..';

interface GameState {
	isLoading: boolean;
	games: Array<Game>;
	searchGames: Array<Game> | null;
	searchOptions: SearchOptions;
	pagination: {
		page: number;
		pageSize: number;
	};
	status?: 'ok' | 'error';
	message?: string;
}

interface SearchOptions {
	pageSize: number;
	page: number;
	searchTerm: string | null;
	platform?: number;
}

const initialState: GameState = {
	isLoading: false,
	games: [],
	searchGames: null,
	searchOptions: {
		searchTerm: null,
		pageSize: 10,
		page: 0,
	},
	pagination: {
		page: 0,
		pageSize: 10,
	},
};

export const getGames = createAsyncThunk('game/getGame', async () => {
	try {
		const { data } = await axiosInstance.get('/games');

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

export const getGameBySlug = createAsyncThunk(
	'game/getGameBySlug',
	async (slug: string) => {
		try {
			const { data } = await axiosInstance.get(`/game/slug/${slug}`);
			return data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
);

export const searchGamesByName = createAsyncThunk(
	'game/searchGamesByName',
	async (searchTerm: string) => {
		try {
			const { data } = await axiosInstance.get('/search', {
				params: {
					game: searchTerm,
				},
			});
			return data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
);

// Search games by name and platform
export const searchGames = createAsyncThunk<
	{
		result: Array<Game>;
		status: 'Success' | 'Error';
		message?: string;
	},
	void,
	{
		state: RootState;
	}
>('game/searchGames', async (_, thunkAPI) => {
	try {
		// If there is no search options, return
		if (!thunkAPI.getState().games.searchOptions) {
			return;
		}
		const searchOptions = thunkAPI.getState().games.searchOptions;
		// If there is no search term and no platform, return
		if (searchOptions === undefined) {
			return [];
		}
		// If there is a search term and a platform, search by both
		if (
			searchOptions.searchTerm &&
			searchOptions.searchTerm.length > 0 &&
			searchOptions.platform
		) {
			const response = await axiosInstance.get('/search', {
				params: {
					game: searchOptions.searchTerm,
					platformId: searchOptions.platform,
				},
			});
			const data = response.data;
			return data;
		}
		// If there is a search term but no platform, search by name
		if (searchOptions.searchTerm && searchOptions.searchTerm.length > 0) {
			const response = await axiosInstance.get('/search', {
				params: {
					game: searchOptions.searchTerm,
				},
			});
			const data = response.data;
			return data;
		}
		// If there is a platform but no search term, search by platform
		if (searchOptions.platform) {
			const response = await axiosInstance.get(
				`/platform/${searchOptions.platform}/games`,
			);
			const data = response.data;
			return data;
		}
		return [];
	} catch (err) {
		console.error(err);
		throw err;
	}
});

export const changePage = createAction<number>('game/changePage');
export const addSearchOptions = createAction<SearchOptions>('game/addSearchOptions');
export const resetGamesSearch = createAction('game/resetSearch');

const gameReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getGames.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(getGames.fulfilled, (state, action) => {
			if (action.payload.status === 'Error') {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			if (state.games.length > 0) {
				state.games = [...state.games, ...action.payload.result];
			} else {
				state.games = action.payload.result;
			}
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(getGames.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(getGameBySlug.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(getGameBySlug.fulfilled, (state, action) => {
			if (action.payload.status === 'Error') {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			// If the game is not already in the list, add it
			if (!state.games.find((game) => game.slug === action.payload.slug)) {
				state.games = [action.payload.result, ...state.games];
			}
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(getGameBySlug.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(searchGames.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(searchGames.fulfilled, (state, action) => {
			if (action.payload.status === 'Error') {
				state.searchOptions = { ...state.searchOptions, page: 0 };
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			state.searchGames = action.payload.result;
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(searchGames.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(resetGamesSearch, (state) => {
			state.searchOptions = { ...initialState.searchOptions };
			state.searchGames = null;
		})
		.addCase(changePage, (state, action) => {
			state.pagination = { ...state.pagination, page: action.payload };
		})
		.addCase(addSearchOptions, (state, action) => {
			state.searchOptions = { ...state.searchOptions, ...action.payload };
		});
});

export default gameReducer;
