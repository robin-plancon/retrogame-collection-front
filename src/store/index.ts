import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import gameReducer from './reducers/game';
//import userReducer from './reducers/user';

const store = configureStore({
	reducer: {
		auth: authReducer,
		games: gameReducer,
		//user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
