import '../GameCard/GameCard.scss';
import './Home.scss';

import React from 'react';

import gameData from '../../data';
import GameCard from '../GameCard/GameCard';

function Home() {
	return (
		<div className="body">
			<div className="game-list">
				{gameData.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
		</div>
	);
}

export default Home;
