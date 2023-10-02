import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';
import { history } from '../../utils/history';
import { loadState, saveState } from '../../utils/localStorage';

interface UserState {
	isLoading: boolean;
	user: {
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
const initialState: UserState = {
	isLoading: false,
	user: null,
	token: null,
	...persistState,
};

// signup thunk call the api and return the data of signup
export const signup = createAsyncThunk('user/signup', async (formData: FormProps) => {
	try {
		const { data } = await axiosInstance.post('/signup', formData);

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

// signin thunk call the api and return the data of signin
export const signin = createAsyncThunk('user/signin', async (formData: FormProps) => {
	try {
		const { data } = await axiosInstance.post('/login', formData);

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

export const resetStatus = createAction('user/reset_status');
export const signout = createAction('user/signout');

// authReducer is a function that take an initial state and an object of builder
// builder is an object that has a method for each action type
const authReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(signup.pending, (state) => {
			// if the action is pending we set the isLoading to true
			state.isLoading = true;
		})
		.addCase(signup.fulfilled, (state, action) => {
			if (action.payload.message) {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}
			// if the action is fulfilled we set the isLoading to false
			state.isLoading = false;
			state.status = 'ok';
		})
		.addCase(signup.rejected, (state) => {
			// if the action is rejected we set the isLoading to false
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(signin.pending, (state) => {
			// if the action is pending we set the isLoading to true
			state.isLoading = true;
		})
		.addCase(signin.fulfilled, (state, action) => {
			// if message is not null we set the status to error and we set the message
			if (action.payload.status === 'error') {
				state.isLoading = false;
				state.status = 'error';
				state.message = action.payload.message;
				return;
			}

			// if the action is fulfilled we set the isLoading to false
			state.isLoading = false;
			state.status = 'ok';
			state.user = action.payload.result.user;
			state.token = action.payload.result.token;
			saveState(action.payload.result.user, action.payload.result.token);

			// we get the from property from the location state to redirect the user to the previous page
			const { from } = history.location.state || { from: { pathname: '/' } };
			// we redirect the user to the home page
			history.navigate(from?.pathname || '/');
		})
		.addCase(signin.rejected, (state) => {
			// if the action is rejected we set the isLoading to false
			state.isLoading = false;
			state.status = 'error';
		})
		.addCase(signout, (state) => {
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
		})
		.addCase(resetStatus, (state) => {
			delete state.status;
			delete state.message;
		});
});

export default authReducer;
