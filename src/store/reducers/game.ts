import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';
import { axiosInstance } from '../../utils/axios';

interface GameState {
	isLoading: boolean;
	games: Array<Game>;
	searchGames: Array<Game> | null;
	status?: 'ok' | 'error';
	message?: string;
}

const initialState: GameState = {
	isLoading: false,
	games: [],
	searchGames: null,
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
			const { data } = await axiosInstance.get(`/game/${slug}`);
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
			state.games = [action.payload.result, ...state.games];
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(getGameBySlug.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(searchGamesByName.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(searchGamesByName.fulfilled, (state, action) => {
			if (action.payload.status === 'Error') {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			// console.log(action.payload.result);
			state.searchGames = action.payload.result;
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(searchGamesByName.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(resetGamesSearch, (state) => {
			state.searchGames = null;
		});
});

export default gameReducer;
