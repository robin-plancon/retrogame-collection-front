import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';
import { axiosInstance } from '../../utils/axios';

interface GameState {
	isLoading: boolean;
	games: Array<Game>;
	status?: 'ok' | 'error';
	message?: string;
}

const initialState: GameState = {
	isLoading: false,
	games: [],
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
			state.games = action.payload.result;
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
			console.log(action.payload.result);
			state.games = [action.payload.result];
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(getGameBySlug.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		});
});

export default gameReducer;
