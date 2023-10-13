import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Game } from '../../@types/game';
import { axiosInstance } from '../../utils/axios';
import { loadState } from '../../utils/localStorage';

interface CollectionState {
	isLoading: boolean;
	games: Array<Game>;
	searchResults?: Array<Game> | null;
	searchOptions: SearchOptions;
	status?: 'ok' | 'error';
	message?: string;
}

interface SearchOptions {
	pageSize: number;
	page: number;
	searchTerm: string | null;
	platform?: number;
}

const initialState: CollectionState = {
	isLoading: false,
	games: [],
	searchOptions: {
		searchTerm: null,
		pageSize: 10,
		page: 0,
	},
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

export const addSearchCollectionOptions = createAction<SearchOptions>(
	'collection/addSearchOptions',
);
export const searchCollection = createAction('collection/searchCollection');
export const resetCollectionSearch = createAction('collection/resetSearch');
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
		.addCase(searchCollection, (state) => {
			let searchResults: Array<Game> = state.games;
			if (state.games.length === 0 || !state.searchOptions) {
				return;
			}
			if (state.searchOptions.searchTerm && state.searchOptions.searchTerm.length > 0) {
				searchResults = state.games.filter((game) => {
					return game.name
						.toLowerCase()
						.includes(state.searchOptions!.searchTerm!.toLowerCase());
				});
			}
			if (state.searchOptions?.platform) {
				searchResults = searchResults.filter((game) => {
					return game.platforms.some(
						(platform) => platform.id === state.searchOptions?.platform,
					);
				});
			}
			state.searchResults = searchResults;
		})
		.addCase(addSearchCollectionOptions, (state, action) => {
			state.searchOptions = { ...state.searchOptions, ...action.payload };
		})
		.addCase(resetCollectionSearch, (state) => {
			state.searchOptions = initialState.searchOptions;
			state.searchResults = null;
		})
		.addCase(resetCollection, (state) => {
			state.isLoading = false;
			state.games = [];
			state.searchResults = null;
			delete state.status;
			delete state.message;
		});
});

export default collectionReducer;
