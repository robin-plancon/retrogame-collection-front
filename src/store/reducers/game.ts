import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';

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
		console.log(import.meta.env.VITE_API_URL_DEV);
		const data = await fetch(`${import.meta.env.VITE_API_URL_DEV}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

		console.log(data);

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

const gameReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getGames.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(getGames.fulfilled, (state, action) => {
			if (action.payload.message) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			state.games = action.payload;
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(getGames.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		});
});

export default gameReducer;
