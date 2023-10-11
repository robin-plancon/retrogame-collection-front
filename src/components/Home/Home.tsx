import './Home.scss';

import React, { useEffect, useState } from 'react';

import platforms from '../../../data/platforms.json';
import { Game } from '../../@types/game';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addSearchOptions } from '../../store/reducers/game';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Home() {
	const dispatch = useAppDispatch();
	const { isLoading, games, status, searchGames, searchOptions } = useAppSelector(
		(state) => state.games,
	);
	// const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
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
			setDisplayedGames(searchGames);
		} else {
			setDisplayedGames(games);
		}
		// setVisibleGames(4);
	}, [searchGames]); // Add games to the dependency array to avoid a warning

	const handleShowMore = () => {
		dispatch(addSearchOptions({ pageSize: (searchOptions?.pageSize ?? 0) + 4 }));
	};

	const platformName = (platformId: number) => {
		return platforms.map((platform_family) =>
			platform_family.platforms.map((platform) => {
				if (platform.id === platformId) {
					return platform.name;
				}
				return null;
			}),
		);
	};

	return (
		<>
			<div className="home">
				<Filter />
				<div className="game-container">
					{!searchOptions?.platform &&
						(!searchOptions?.searchTerm || searchOptions.searchTerm === '') && (
							<h2 className="game-container--title">
								Voici une liste de jeux aléatoires
							</h2>
						)}
					{!searchOptions?.platform &&
						searchOptions?.searchTerm &&
						searchOptions?.searchTerm?.length > 0 && (
							<h2 className="game-container--title">
								Résultats pour {searchOptions.searchTerm}
							</h2>
						)}
					{searchOptions?.platform &&
						searchOptions.searchTerm &&
						searchOptions.searchTerm.length > 0 && (
							<h2 className="game-container--title">
								Résultats pour {searchOptions.searchTerm} sur{' '}
								{platformName(searchOptions.platform)}
							</h2>
						)}
					{searchOptions?.platform &&
						(!searchOptions?.searchTerm || searchOptions.searchTerm === '') && (
							<h2 className="game-container--title">
								Jeux sur {platformName(searchOptions.platform)}
							</h2>
						)}
					<div className="game-list">
						{isLoading && <p>Chargement...</p>}
						{!isLoading && status === 'error' && (
							<p>Erreur lors du chargement des jeux.</p>
						)}
						{!isLoading && displayedGames.length === 0 && <p>Aucun jeu trouvé.</p>}

						{!isLoading &&
							displayedGames
								.slice(0, searchOptions?.pageSize)
								.map((game) => <GameCard key={game.id} game={game} />)}
					</div>
					{searchOptions?.pageSize && searchOptions?.pageSize < displayedGames.length && (
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
