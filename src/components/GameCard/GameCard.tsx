import React from 'react';

// The component renders a card and displays game information
function GameCard({ game }) {
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

export default GameCard;
