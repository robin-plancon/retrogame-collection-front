import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

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
		const auth = loadState();
		if (!auth) {
			return;
		}
		const user = auth.user;
		const token = auth.token;
		console.log(user);
		console.log(token);
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		axiosInstance.defaults.withCredentials = true;
		const { data } = await axiosInstance.get(`/user/${user.id}/collection`);

		if (data.status === 'error') {
			return data.message;
		}
		console.log(data);

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

const collectionReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getCollection.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(getCollection.fulfilled, (state, action) => {
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
		.addCase(getCollection.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		});
});

export default collectionReducer;
