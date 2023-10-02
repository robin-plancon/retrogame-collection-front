import './App.scss';

import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import store from '../store';
import { history } from '../utils/history';
import { saveState } from '../utils/localStorage';
import About from './About/About';
import GameDetails from './GameDetails/GameDetails';
import Home from './Home/Home';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';

function App() {
	store.subscribe(() => {
		saveState(store.getState().auth.user, store.getState().auth.token || '');
	});

	history.navigate = useNavigate();
	history.location = useLocation();

	const authUser = useAppSelector((state) => state.auth.user);

	return (
		<div className="App">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game/:id" element={<GameDetails />} />
					<Route path="/about" element={<About />} />
					{!authUser && <Route path="/signup" element={<Signup />} />}
					{!authUser && <Route path="/signin" element={<Signin />} />}
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
