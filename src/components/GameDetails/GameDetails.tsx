import './GameDetails.scss';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import gameData from '../../data';

function GameDetails() {
	const { id } = useParams();

	// Search for the game matching the ID in the game data
	const game = gameData.find((game) => game.id === parseInt(id));

	// Check if the game does exist
	if (!game) {
		return <div>The game was not found</div>;
	}

	return (
		<Link to="/">
			<div className="game-details">
				<img src={game.imageUrl} alt={game.title} />
				<div className="game-details-info"></div>
				<h2>{game.title}</h2>
				<div className="label">Console:</div>{' '}
				<div className="game-value">{game.console}</div>
				<div className="label">Genre:</div> <div className="game-value">{game.genre}</div>
				<div className="label">Date de sortie:</div>{' '}
				<div className="game-value">{game.releaseDate}</div>
				<div className="label">Description:</div>{' '}
				<div className="game-description">{game.summary}</div>
			</div>
		</Link>
	);
}

export default GameDetails;
