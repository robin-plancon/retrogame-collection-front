import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';
//import { history } from '../../utils/history';
import { loadState, saveState } from '../../utils/localStorage';

interface userState {
	isLoading: boolean;
	user: {
		id?: string;
		nickname: string;
		email: string;
	} | null;
	token: string | null;
	status?: 'ok' | 'error';
	message?: string;
}

type FormProps = {
	nickname?: string;
	email?: string;
	password?: string;
	confirmation?: string;
};

// persistState is an object that contains the user and the token in the localStorage
const persistState = loadState();

// initialState is an object that has the same structure as the state
const initialState: userState = {
	isLoading: false,
	user: null,
	token: null,
	...persistState,
};

// detail thunk call the api and return the data of signup
export const detail = createAsyncThunk('user/profile', async () => {
	try {
		const { data } = await axiosInstance.get('/user/profile');
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

// update thunk call the api and return the data of signin
export const update = createAsyncThunk('user/update', async (formData: FormProps) => {
	try {
		const { data } = await axiosInstance.post('/user/update', formData);
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

// resetStatus action will reset the status and the message
export const resetStatus = createAction('user/reset_status');
// signout action will remove the user and the token from the localStorage
export const remove = createAction('user/delete');

// userReducer is a function that takes an initial state and an object of builder
// builder is an object that has a method for each action type
const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(detail.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(detail.fulfilled, (state, action) => {
			if (action.payload.message) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			state.isLoading = false;
			state.status = 'ok';
			state.user = action.payload.user;
		})
		.addCase(detail.rejected, (state) => {
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(update.pending, (state) => {
			// if the action is pending we set isLoading to true
			state.isLoading = true;
		})
		.addCase(update.fulfilled, (state, action) => {
			if (action.payload.message) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
			} else {
				// if the action is fulfilled we set isLoading to false
				state.isLoading = false;
				state.status = 'ok';
				state.user = action.payload.user;
				state.token = action.payload.token;
				saveState(action.payload.user, action.payload.token);
			}
		})
		.addCase(update.rejected, (state) => {
			// if the action is rejected we set isLoading to false
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(remove, (state) => {
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
		})
		.addCase(resetStatus, (state) => {
			delete state.status;
			delete state.message;
		});
	// we get the from property from the location state to redirect the user to the previous page
	//const { from } = history.location.state || { from: { pathname: '/' } };
	// we redirect the user to the home page
	//history.navigate(from?.pathname || '/');
});

export default userReducer;
