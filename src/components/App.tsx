import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './About/About';
import Home from './Home/Home';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</div>
	);
}

export default App;
