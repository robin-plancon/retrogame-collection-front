import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// TODO: add a status in the state to know request status
interface UserState {
	isLoading: boolean;
	pseudo: string | null;
	token: string | null;
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
	token: null,
};

// signup thunk call the api and return the data of signup
export const signup = createAsyncThunk(
	'user/signup',
	async (formData: FormProps, thunkAPI) => {
		console.log(thunkAPI);
		console.log(thunkAPI.getState());

		console.log(formData);
		// TODO: call the api
		// try {
		// 	const { data } = await fetch('http://localhost:3000/signup', {
		// 		method: 'POST',
		// 		body: JSON.stringify(formData),
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}).then((res) => res.json());

		// 	return data;
		// } catch (err) {
		// 	console.log(err);
		// 	throw err;
		// }
	},
);

// createReducer is a function that take an initial state and an object of builder
// builder is an object that has a method for each action type
const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(signup.pending, (state) => {
			// if the action is pending we set the isLoading to true
			state.isLoading = true;
		})
		.addCase(signup.fulfilled, (state) => {
			// if the action is fulfilled we set the isLoading to false
			state.isLoading = false;
		})
		.addCase(signup.rejected, (state) => {
			// if the action is rejected we set the isLoading to false
			state.isLoading = false;
		});
});

export default userReducer;
