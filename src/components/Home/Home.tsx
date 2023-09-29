import './Home.scss';

import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getGames } from '../../store/reducers/game';
import GameCard from '../GameCard/GameCard';
import Filter from './Filter/Filter';

function Home() {
	const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render

	const gameData = useAppSelector((state) => state.games.games);

	const gamesToShow = gameData.slice(0, visibleGames);

	const dispacth = useAppDispatch();

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		dispacth(getGames());
	}, [isFirst]);

	const handleShowMore = () => {
		setVisibleGames(visibleGames + 4); // + 4 more games
	};

	return (
		<>
			<div className="home">
				<Filter />
				<div className="game-list">
					{gamesToShow.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</div>
			{visibleGames < gameData.length && (
				<div className="load-more">
					<button className="load-more--button" onClick={handleShowMore}>
						Afficher plus
					</button>
				</div>
			)}
		</>
	);
}

export default Home;
