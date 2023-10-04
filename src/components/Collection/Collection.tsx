import './Collection.scss';

import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/redux';
// import { history } from '../../utils/history';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Collection() {
	const { isLoading, games, status } = useAppSelector((state) => state.collection);
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
	}, [isFirst]);

	return (
		<div className="collection">
			<Filter />
			<div className="collection-container">
				<h2 className="collection-title">Ma collection</h2>
				<div className="collection-list">
					{isLoading && !games.length && <p>Chargement...</p>}
					{!isLoading && status === 'error' && <p>Erreur lors du chargement des jeux.</p>}
					{!isLoading && games.length === 0 && <p>Aucun jeu dans votre collection.</p>}
					{games.length && games.map((game) => <GameCard key={game.id} game={game} />)}
				</div>
			</div>
		</div>
	);
}

export default Collection;
