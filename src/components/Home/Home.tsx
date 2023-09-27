import './Home.scss';

import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { getGames } from '../../store/reducers/game';

function Home() {
	const [count, setCount] = useState(0);
	const [isFirst, setIsFirst] = useState(true);

	const dispacth = useAppDispatch();

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		dispacth(getGames());
	}, [isFirst]);

	return (
		<div className="Home">
			<header className="App-header">
				<p className="header">
					🚀 Vite + React + Typescript 🤘 & <br />
					Eslint 🔥+ Prettier
				</p>

				<div className="body">
					<button onClick={() => setCount((count) => count + 1)}>
						🪂 Click me : {count}
					</button>

					<p> Don&apos;t forgot to install Eslint and Prettier in Your Vscode.</p>

					<p>
						Mess up the code in <code>App.tsx </code> and save the file.
					</p>
					<p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
						</a>
						{' | '}
						<a
							className="App-link"
							href="https://vitejs.dev/guide/features.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Vite Docs
						</a>
					</p>
				</div>
			</header>
		</div>
	);
}

export default Home;
