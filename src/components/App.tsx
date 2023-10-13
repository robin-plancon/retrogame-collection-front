import './App.scss';

import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import store from '../store';
import { checkAuth } from '../store/reducers/auth';
import { getCollection } from '../store/reducers/collection';
import { getGames } from '../store/reducers/game';
import { history } from '../utils/history';
import { saveState } from '../utils/localStorage';
import About from './About/About';
import Collection from './Collection/Collection';
import GameDetails from './GameDetails/GameDetails';
import Home from './Home/Home';
import ResetPassword from './ResetPassword/ResetPassword';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import UserProfile from './UserProfile/UserProfile';

function App() {
	// To save the state in the sessionStorage
	store.subscribe(() => {
		saveState(store.getState().auth.user, store.getState().auth.token || '');
	});

	// To use history outside of a component
	history.navigate = useNavigate();
	history.location = useLocation();

	// To avoid rerender when loading page
	const [isFirst, setIsFirst] = React.useState(true);

	// To get the user and token from the store
	const { user, token } = useAppSelector((state) => state.auth);

	// To dispatch actions
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		dispatch(checkAuth());
		dispatch(getGames());
	}, [isFirst]);

	useEffect(() => {
		if (user && token && !isFirst) {
			dispatch(getCollection());
		}
	}, [user, token, isFirst]);

	return (
		<div className="App">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game/:slug" element={<GameDetails />} />
					<Route path="/about" element={<About />} />
					<Route path="/reset-form" element={<ResetPassword />} />
					{(!user || !token) && <Route path="/signup" element={<Signup />} />}
					{(!user || !token) && <Route path="/signin" element={<Signin />} />}
					{user && token && <Route path="/collection" element={<Collection />} />}
					{user && token && <Route path="/user/profile" element={<UserProfile />} />}
					{(!user || !token) && <Route path="/user/delete" element={<UserProfile />} />}
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
