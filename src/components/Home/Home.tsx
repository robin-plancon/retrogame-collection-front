import '../GameCard/GameCard.scss';
import './Home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import gameData from '../../data';
import GameCard from '../GameCard/GameCard';

function Home() {
	return (
		<div className="body">
			<div className="game-list">
				{gameData.map((game) => (
					<Link key={game.id} to={`/game/${game.id}`} state={{ summary: game.summary }}>
						<GameCard game={game} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default Home;
