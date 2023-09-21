import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './About/About';
import Home from './Home/Home';
import Footer from './utils/Footer/Footer';
import Header from './utils/Header/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
