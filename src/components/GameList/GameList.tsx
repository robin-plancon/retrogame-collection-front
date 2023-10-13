import { Game } from '../../@types/game';
import GameCard from '../GameCard/GameCard';

function GameList({ games }: { games: Game[] }) {
	return (
		<>
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</>
	);
}

export default GameList;
