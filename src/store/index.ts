import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import collectionReducer from './reducers/collection';
import gameReducer from './reducers/game';

const store = configureStore({
	reducer: {
		auth: authReducer,
		games: gameReducer,
		collection: collectionReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
