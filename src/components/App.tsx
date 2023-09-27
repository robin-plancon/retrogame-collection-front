import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './About/About';
import GameDetails from './GameDetails/GameDetails';
import Home from './Home/Home';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import Footer from './utils/Footer/Footer';
import Header from './utils/Header/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
					<Route path="/about" element={<About />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
