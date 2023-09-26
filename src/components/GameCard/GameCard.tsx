import React from 'react';

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
function GameCard({ game }) {
	return (
		<div className="game-card">
			<img src={game.imageUrl} alt={game.title} />
			<div className="game-card-info">
				<h2>{game.title}</h2>
				<div className="label">Console:</div>{' '}
				<div className="game-value">{game.console}</div>
				<div className="label">Genre:</div> <div className="game-value">{game.genre}</div>
				<div className="label">Date de sortie:</div>{' '}
				<div className="game-value">{game.releaseDate}</div>
			</div>
		</div>
	);
}

export default GameCard;
