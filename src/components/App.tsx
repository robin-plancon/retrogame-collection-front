import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About/About';
import Home from './Home/Home';
import Footer from './utils/Footer/Footer';
import Header from './utils/Header/Header';
import GameDetails from './GameDetails/GameDetails';

import './App.scss';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/game/:id" element={<GameDetails />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
