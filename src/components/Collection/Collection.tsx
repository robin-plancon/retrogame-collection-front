import './Collection.scss';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCollection } from '../../store/reducers/collection';
import GameCard from '../GameCard/GameCard';
import Filter from '../shared/Filter/Filter';

function Collection() {
	const { isLoading, games, status } = useAppSelector((state) => state.collection);
	const { user, token } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user && token && !games.length) {
			dispatch(getCollection());
		}
	}, [dispatch]);

	return (
		<div className="collection">
			<Filter />
			<div className="collection-container">
				<div className="collection-list">
					{isLoading && <p>Chargement...</p>}
					{!isLoading && status === 'error' && <p>Erreur lors du chargement des jeux.</p>}
					{!isLoading && games.length === 0 && <p>Aucun jeu dans votre collection.</p>}
					{!isLoading && games.map((game) => <GameCard key={game.id} game={game} />)}
				</div>
			</div>
		</div>
	);
}

export default Collection;
