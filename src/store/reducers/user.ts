import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface UserState {
	isLoading: boolean;
	pseudo: string | null;
	token: string | null;
}

type FormProps = {
	pseudo?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

const initialState: UserState = {
	isLoading: false,
	pseudo: null,
	token: null,
};

export const signup = createAsyncThunk(
	'user/signup',
	async (formData: FormProps, thunkAPI) => {
		console.log(thunkAPI);
		console.log(thunkAPI.getState());

		console.log(formData);

		const { data } = await fetch('http://localhost:3000/api/user/signup', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

		return data;
	},
);

const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(signup.pending, (state, action) => {
			state.isLoading = true;
		})
		.addCase(signup.fulfilled, (state, action) => {
			state.isLoading = false;
			state.pseudo = action.payload.pseudo;
		})
		.addCase(signup.rejected, (state, action) => {
			state.isLoading = false;
		});
});

export default userReducer;
