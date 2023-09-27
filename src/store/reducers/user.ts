import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface UserState {
	isLoading: boolean;
	pseudo: string | null;
	// token: string | null;
	status?: 'ok' | 'error';
	message?: string;
}

type FormProps = {
	nickname?: string;
	email?: string;
	password?: string;
	confirmation?: string;
};

const initialState: UserState = {
	isLoading: false,
	pseudo: null,
	// token: null,
};

// signup thunk call the api and return the data of signup
export const signup = createAsyncThunk('user/signup', async (formData: FormProps) => {
	try {
		const data = await fetch('http://localhost:3000/signup', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
});

export const resetStatus = createAction('user/reset_status');

// createReducer is a function that take an initial state and an object of builder
// builder is an object that has a method for each action type
const userReducer = createReducer(initialState, (builder) => {
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
		.addCase(resetStatus, (state) => {
			delete state.status;
			delete state.message;
		});
});

export default userReducer;
