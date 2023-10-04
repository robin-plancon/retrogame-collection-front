import './Home.scss';

import React, { useEffect, useState } from 'react';

import { Game } from '../../@types/game';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCollection } from '../../store/reducers/collection';
import { getGames, getGamesByName } from '../../store/reducers/game';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Home() {
	const { isLoading, games, status } = useAppSelector((state) => state.games);
	const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render
	const [searchResults] = useState<Game[]>([]);
	const [searchTerm] = useState<string>('');

	const gameData = useAppSelector((state) => state.games.games);

	// const gamesToShow = gameData.slice(0, visibleGames);
	const isAuth = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		if (isAuth.token && isAuth.user) {
			dispatch(getCollection());
		}

		if (searchTerm) {
			dispatch(getGamesByName(searchTerm));
		} else {
			dispatch(getGames());
		}
	}, [isFirst, dispatch, isAuth.token, isAuth.user, searchTerm]);

	const handleShowMore = () => {
		if (searchResults.length > 0) {
			setVisibleGames(visibleGames + 4);
		} else {
			setVisibleGames(visibleGames + 4); // + 4 more games
		}
	};

	return (
		<>
			<div className="home">
				<Filter />
				<div className="game-container">
					<div className="game-list">
						{isLoading && <p>Chargement...</p>}
						{!isLoading && status === 'error' && (
							<p>Erreur lors du chargement des jeux.</p>
						)}
						{!isLoading && searchResults.length === 0 && games.length === 0 && (
							<p>Aucun jeu trouvé.</p>
						)}
						{!isLoading &&
							(searchResults.length > 0
								? searchResults
								: games.slice(0, visibleGames)
							).map((game) => <GameCard key={game.id} game={game} />)}
					</div>
					{visibleGames < gameData.length && (
						<div className="load-more">
							<button className="load-more--button" onClick={handleShowMore}>
								Afficher plus
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Home;
