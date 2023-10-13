import './GameCard.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Game } from '../../@types/game';
import placeholder from '../../assets/placeholder_image.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	addGameToCollection,
	removeGameFromCollection,
} from '../../store/reducers/collection';
import { history } from '../../utils/history';

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
	const { user, token } = useAppSelector((state) => state.auth);
	const collection = useAppSelector((state) => state.collection.games);

	const dispatch = useAppDispatch();

	// Checks if the game belongs to the user's collection
	const isInCollection = collection.find((g) => g.id === game.id);

	const handleClick = () => {
		if (isInCollection) {
			// Remove game from collection
			dispatch(removeGameFromCollection(game));
		} else {
			// Add game to collection
			dispatch(addGameToCollection(game));
		}
	};

	return (
		<div className={`game-card ${isInCollection ? 'in-collection' : ''}`}>
			<Link
				to={`/game/${game.slug}`}
				state={{ from: history.location }}
				className="game-card--game"
			>
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
			{user && token && (
				<button
					className={`game-card--button ${isInCollection ? 'in-collection' : ''}`}
					onClick={handleClick}
				>
					{isInCollection ? 'Retirer de ma collection' : 'Ajouter à ma collection'}
				</button>
			)}
		</div>
	);
}

export default GameCard;
