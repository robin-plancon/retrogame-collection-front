import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './reducers/game';
import userReducer from './reducers/user';

const store = configureStore({
	reducer: {
		user: userReducer,
		games: gameReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
