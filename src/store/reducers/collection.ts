import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';
import { axiosInstance } from '../../utils/axios';
import { loadState } from '../../utils/sessionStorage';

interface CollectionState {
	isLoading: boolean;
	games: Array<Game>;
	status?: 'ok' | 'error';
	message?: string;
}

const initialState: CollectionState = {
	isLoading: false,
	games: [],
};

export const getCollection = createAsyncThunk('collection/getCollection', async () => {
	try {
		// loadState function will load the state from the sessionStorage
		const auth = loadState();
		// if there is no user or token, return
		if (!auth || !auth.user || !auth.token) {
			return;
		}
		const user = auth.user;
		const token = auth.token;
		// add the token to the axios header
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		axiosInstance.defaults.withCredentials = true;
		// allow axios to send cookies
		const { data } = await axiosInstance.get(`/user/${user.id}/collection`);
		axiosInstance.defaults.headers.common['Authorization'] = '';
		axiosInstance.defaults.withCredentials = false;
		if (data.status === 'error') {
			return data.message;
		}
		// console.log(data);

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

export const addGameToCollection = createAsyncThunk(
	'collection/addGameToCollection',
	async (game: Game) => {
		try {
			const auth = loadState();
			if (!auth || !auth.user || !auth.token) {
				return;
			}
			const token = auth.token;
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			axiosInstance.defaults.withCredentials = true;
			const { data } = await axiosInstance.post(`/user/collection/${game.id}`, {
				slug: game.slug,
			});
			axiosInstance.defaults.headers.common['Authorization'] = '';
			axiosInstance.defaults.withCredentials = false;
			return { result: data, game: game };
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
);

export const removeGameFromCollection = createAsyncThunk(
	'collection/removeGameFromCollection',
	async (game: Game) => {
		try {
			const auth = loadState();
			if (!auth || !auth.user || !auth.token) {
				return;
			}
			const token = auth.token;
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			axiosInstance.defaults.withCredentials = true;
			const { data } = await axiosInstance.delete(`/user/collection/${game.id}`);
			axiosInstance.defaults.headers.common['Authorization'] = '';
			return { result: data, game: game };
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
);

export const resetCollection = createAction('collection/resetCollection');

const collectionReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getCollection.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(getCollection.fulfilled, (state, action) => {
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
		.addCase(getCollection.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(addGameToCollection.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(addGameToCollection.fulfilled, (state, action) => {
			if (action.payload?.result.status === 'Error' || !action.payload?.game) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload?.result.message;
				return;
			}
			state.games.push(action.payload.game);
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(addGameToCollection.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(removeGameFromCollection.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(removeGameFromCollection.fulfilled, (state, action) => {
			if (action.payload?.result.status === 'Error' || !action.payload?.game) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload?.result.message;
				return;
			}
			state.games = state.games.filter((game) => game.id !== action.payload?.game.id);
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(removeGameFromCollection.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(resetCollection, (state) => {
			state.isLoading = false;
			state.games = [];
			delete state.status;
			delete state.message;
		});
});

export default collectionReducer;
