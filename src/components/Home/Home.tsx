import React from 'react';
import GameCard from '../GameCard/GameCard';
import gameData from '../../data';



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
