import '../GameCard/GameCard.scss';
import './Home.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import gameData from '../../data';
import { useAppDispatch } from '../../hooks/redux';
import { getGames } from '../../store/reducers/game';
import GameCard from '../GameCard/GameCard';

function Home() {
	const [isFirst, setIsFirst] = useState(true);

	const dispacth = useAppDispatch();

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		dispacth(getGames());
	}, [isFirst]);

	return (
		<div className="body">
			<div className="game-list">
				{gameData.map((game) => (
					<Link key={game.id} to={`/game/${game.id}`} state={{ summary: game.summary }}>
						<GameCard game={game} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default Home;
