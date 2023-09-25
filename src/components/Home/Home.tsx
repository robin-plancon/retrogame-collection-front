import React from 'react';

import gameData from '../../data';
import GameCard from '../GameCard/GameCard';

function Home() {
	return (
		// List of games

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
