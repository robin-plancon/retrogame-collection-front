import './Collection.scss';

import React, { useEffect, useState } from 'react';

// import { history } from '../../utils/history';
import platforms from '../../../data/platforms.json';
import { useAppSelector } from '../../hooks/redux';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Collection() {
	const { isLoading, games, status, searchResults, searchOptions } = useAppSelector(
		(state) => state.collection,
	);
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
	}, [isFirst]);

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
		<div className="collection">
			<Filter />
			<div className="collection-container">
				{!searchOptions?.platform &&
					(!searchOptions?.searchTerm || searchOptions.searchTerm === '') && (
						<h2 className="collection-title">Ma collection</h2>
					)}
				{searchOptions?.platform &&
					(!searchOptions?.searchTerm || searchOptions.searchTerm === '') && (
						<h2 className="collection-title">
							Ma collection de jeux {platformName(searchOptions.platform)}
						</h2>
					)}
				{!searchOptions?.platform &&
					searchOptions?.searchTerm &&
					searchOptions.searchTerm !== '' && (
						<h2 className="collection-title">
							Ma collection de jeux contenant &quot;{searchOptions.searchTerm}&quot;
						</h2>
					)}
				{searchOptions?.platform &&
					searchOptions?.searchTerm &&
					searchOptions.searchTerm !== '' && (
						<h2 className="collection-title">
							Ma collection de jeux {platformName(searchOptions.platform)} contenant
							&quot;
							{searchOptions.searchTerm}&quot;
						</h2>
					)}
				<div className="collection-list">
					{isLoading && games.length === 0 && <p>Chargement...</p>}
					{!isLoading && status === 'error' && <p>Erreur lors du chargement des jeux.</p>}
					{!isLoading && games.length === 0 && <p>Aucun jeu dans votre collection.</p>}
					{searchResults &&
						searchResults.length > 0 &&
						searchResults.map((game) => <GameCard key={game.id} game={game} />)}
					{!searchResults &&
						games.length > 0 &&
						games.map((game) => <GameCard key={game.id} game={game} />)}
				</div>
			</div>
		</div>
	);
}

export default Collection;
