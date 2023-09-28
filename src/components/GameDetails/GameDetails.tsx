import './GameDetails.scss';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

// import gameData from '../../data';

function GameDetails() {
	const { id } = useParams<string>();

	const gameData = useAppSelector((state) => state.games.games);

	// Search for the game matching the ID in the game data
	const game = gameData.find((game) => game.id === parseInt(id || ''));

	// Check if the game does exist
	if (!game) {
		return <div>The game was not found</div>;
	}

	return (
		<Link to="/">
			<div className="game-details">
				<img src={game.cover?.url} alt={game.name} />
				<div className="game-details-info"></div>
				<h2>{game.name}</h2>
				<div className="label">Console:</div>{' '}
				<div className="game-value">{game.platforms[0].name}</div>
				<div className="label">Genre:</div>
				{game.genres && <div className="game-value">{game.genres[0]?.name}</div>}
				<div className="label">Date de sortie:</div>{' '}
				<div className="game-value">{game.first_release_date}</div>
				<div className="label">Description:</div>{' '}
				<div className="game-description">{game.summary}</div>
			</div>
		</Link>
	);
}

export default GameDetails;
