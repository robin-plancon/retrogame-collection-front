import './GameCard.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Game } from '../../@types/game';
import placeholder from '../../assets/placeholder_image.png';

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
	const date = new Date(game.first_release_date * 1000);
	const formattedDate = date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const platforms = game.platforms?.map((platform) => platform.name).join(', ');
	const genres = game.genres?.map((genre) => genre.name).join(', ') || 'non renseigné';

	return (
		<Link to={`/game/${game.id}`} state={{ summary: game.summary }} className="game-card">
			<img
				src={game.cover?.url || placeholder}
				alt={game.name}
				className="game-card--image"
			/>
			<div className="game-card--info">
				<h2 className="game-card--name">{game.name}</h2>
				<p className="game-card--label">Console:</p>
				<p className="game-card--value">{platforms}</p>
				<p className="game-card--label">Genre:</p>
				<p className="game-card--value">{genres}</p>
				<p className="game-card--label">Date de sortie:</p>
				<p className="game-card--value">{formattedDate}</p>
			</div>
		</Link>
	);
}

export default GameCard;
