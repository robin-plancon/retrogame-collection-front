import './GameDetails.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import ghostIcon from '../../assets/icons/ghost.svg';
import placeholder from '../../assets/placeholder_image.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	addGameToCollection,
	removeGameFromCollection,
} from '../../store/reducers/collection';
import { getGameBySlug } from '../../store/reducers/game';
import { history } from '../../utils/history';

function GameDetails() {
	const { slug } = useParams<string>();

	const { games, isLoading } = useAppSelector((state) => state.games);
	const isAuth = useAppSelector((state) => state.auth);
	const collection = useAppSelector((state) => state.collection.games);
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render

	const dispatch = useAppDispatch();

	// Search for the game matching the ID in the game data
	const game = games.concat(collection).find((game) => game.slug === slug);

	const { from } = history.location.state || { from: { pathname: '/' } };

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		if (!game && slug) {
			dispatch(getGameBySlug(slug));
		}
	}, [isFirst]);

	const handleClick = () => {
		if (!game) {
			return;
		}
		if (collection.find((g) => g.id === game.id)) {
			// Remove game from collection
			dispatch(removeGameFromCollection(game));
		} else {
			// Add game to collection
			dispatch(addGameToCollection(game));
		}
	};

	if ((!game && slug) || isLoading) {
		return (
			<p className="game-details--message">
				<div className="centered">
					<img
						src={ghostIcon}
						alt="Chargement..."
						style={{ width: '150px', opacity: 0.8 }}
					/>
				</div>
			</p>
		);
	}

	// Check if the game does exist
	if (!game) {
		return <p className="game-details--message">Le jeu n&apos;a pas été trouvé.</p>;
	}

	const date = new Date(game.first_release_date * 1000);
	const formattedDate = date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const platforms = game.platforms?.map((platform) => platform.name).join(', ');
	const genres = game.genres?.map((genre) => genre.name).join(', ') || 'non renseigné';

	return (
		<div
			className={`game-details ${
				collection.find((g) => g.id === game.id) ? 'in-collection' : ''
			}`}
		>
			<Link
				to={from?.pathname || '/'}
				className="game-details--game"
				state={{ from: history.location }}
			>
				<img
					src={game.cover?.url || placeholder}
					alt={game.name}
					className="game-details--image"
				/>
				<div className="game-details--info">
					<h2 className="game-details--name">{game.name}</h2>
					<p className="game-details--label">Console:</p>
					<p className="game-details--value">{platforms}</p>
					<p className="game-details--label">Genre:</p>
					<p className="game-details--value">{genres}</p>
					<p className="game-details--label">Date de sortie:</p>
					<p className="game-details--value">{formattedDate}</p>
					<p className="game-details--label">Description:</p>
					<p className="game-details--description">
						{game.summary || 'résumé non disponible'}
					</p>
				</div>
			</Link>
			{isAuth.user && isAuth.token && (
				<button
					className={`game-card--button ${
						collection.find((g) => g.id === game.id) ? 'in-collection' : ''
					}`}
					onClick={handleClick}
				>
					{collection.find((g) => g.id === game.id)
						? 'Retirer de ma collection'
						: 'Ajouter à ma collection'}
				</button>
			)}
		</div>
	);
}

export default GameDetails;
