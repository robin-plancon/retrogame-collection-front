import './GameDetails.scss';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import placeholder from '../../assets/placeholder_image.png';
import { useAppSelector } from '../../hooks/redux';

function GameDetails() {
	const { slug } = useParams<string>();

	const gameData = useAppSelector((state) => state.games.games);

	// Search for the game matching the ID in the game data
	const game = gameData.find((game) => game.slug === slug);

	// Check if the game does exist
	if (!game) {
		return <div>The game was not found</div>;
	}

	const date = new Date(game.first_release_date * 1000);
	const formattedDate = date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const platforms = game.platforms?.map((platform) => platform.name).join(', ');
	const genres = game.genres?.map((genre) => genre.name).join(', ') || 'non renseigné';

	console.log('id', game.id);
	console.log('slug', game.slug);

	return (
		<Link to="/" className="game-details">
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
	);
}

export default GameDetails;
