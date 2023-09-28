import React from 'react';

import { Game } from '../../@types/game';

/*function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.title} />
      <h2>{game.title}</h2>
      <p>Console: {game.console}</p>
      <p>Genre: {game.genre}</p>
      <p>Date de sortie: {game.releaseDate}</p>
    </div>
  );
}
*/

// The component renders a card and displays game information
function GameCard({ game }: { game: Game }) {
	return (
		<div className="game-card">
			<img src={game.cover?.url} alt={game.name} />
			<div className="game-card-info">
				<h2>{game.name}</h2>
				<div className="label">Console:</div>{' '}
				<div className="game-value">{game.platforms[0].name}</div>
				<div className="label">Genre:</div>
				{game.genres && <div className="game-value">{game.genres[0]?.name}</div>}
				<div className="label">Date de sortie:</div>{' '}
				<div className="game-value">{game.first_release_date}</div>
			</div>
		</div>
	);
}

export default GameCard;
