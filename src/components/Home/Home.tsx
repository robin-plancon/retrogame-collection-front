import './Home.scss';

import React, { useEffect, useState } from 'react';

import { Game } from '../../@types/game';
import { useAppSelector } from '../../hooks/redux';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Home() {
	const { isLoading, games, status, searchGames } = useAppSelector(
		(state) => state.games,
	);
	const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render
	const [displayedGames, setDisplayedGames] = useState<Game[]>([]); // To avoid displaying the "Afficher plus" button on the first render

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
	}, [isFirst]);

	useEffect(() => {
		setDisplayedGames(games);
	}, [games]); // Add games to the dependency array to avoid a warning

	useEffect(() => {
		if (searchGames) {
			console.log(searchGames);
			setDisplayedGames(searchGames);
		} else {
			setDisplayedGames(games);
		}
		setVisibleGames(4);
	}, [searchGames]); // Add games to the dependency array to avoid a warning

	const handleShowMore = () => {
		if (displayedGames.length > 0) {
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
						{!isLoading && displayedGames.length === 0 && <p>Aucun jeu trouvé.</p>}

						{!isLoading &&
							displayedGames
								.slice(0, visibleGames)
								.map((game) => <GameCard key={game.id} game={game} />)}
					</div>
					{visibleGames < displayedGames.length && (
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
