import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import gameReducer from './reducers/game';

const store = configureStore({
	reducer: {
		auth: authReducer,
		games: gameReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
