import '../GameCard/GameCard.scss';
import './Home.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import gameData from '../../data';
import GameCard from '../GameCard/GameCard';
//import Filter from './Filter/Filter';

function Home() {
	const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
	const gamesToShow = gameData.slice(0, visibleGames);

	const handleShowMore = () => {
		setVisibleGames(visibleGames + 4); // + 4 more games
	};

	return (
		<div className="body">
			<div className="game-list">
				{gamesToShow.map((game) => (
					<Link key={game.id} to={`/game/${game.id}`} state={{ summary: game.summary }}>
						<GameCard game={game} />
					</Link>
				))}
			</div>
			{visibleGames < gameData.length && (
				<div className="load-more">
					<button onClick={handleShowMore}>Afficher plus</button>
				</div>
			)}
		</div>
	);
}

export default Home;
