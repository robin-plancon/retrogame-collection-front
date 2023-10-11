import './Home.scss';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import platforms from '../../../data/platforms.json';
import { Game } from '../../@types/game';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addSearchOptions, changePage } from '../../store/reducers/game';
import GameList from '../GameList/GameList';
import Filter from '../shared/Filter/Filter';

function Home() {
	const dispatch = useAppDispatch();
	const { isLoading, games, status, searchGames, searchOptions, pagination } =
		useAppSelector((state) => state.games);
	// const [visibleGames, setVisibleGames] = useState(4); // Number of cards to display initially
	const [isFirst, setIsFirst] = useState(true); // To avoid displaying the "Afficher plus" button on the first render
	const [displayedGames, setDisplayedGames] = useState<Game[]>([]); // To avoid displaying the "Afficher plus" button on the first render
	const [itemOffset, setItemOffset] = useState(0); // To avoid displaying the "Afficher plus" button on the first render

	const pageCount = Math.ceil(
		displayedGames.length / (searchGames ? searchOptions.pageSize : pagination.pageSize),
	);

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

	const currentItems = displayedGames.slice(itemOffset, itemOffset + pagination.pageSize);

	const handlePageClick = (event: { selected: number }) => {
		if (searchGames) {
			dispatch(addSearchOptions({ ...searchOptions, page: event.selected }));
			const newOffset = (event.selected * searchOptions.pageSize) % displayedGames.length;
			setItemOffset(newOffset);
			return;
		}
		dispatch(changePage(event.selected));
		const newOffset = (event.selected * pagination.pageSize) % displayedGames.length;
		setItemOffset(newOffset);
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

						{!isLoading && <GameList games={currentItems} />}
						<ReactPaginate
							breakLabel="..."
							nextLabel="Suivant"
							onPageChange={handlePageClick}
							pageCount={pageCount}
							pageRangeDisplayed={2}
							marginPagesDisplayed={2}
							previousLabel="Précédent"
							renderOnZeroPageCount={null}
							forcePage={searchGames ? searchOptions.page : pagination.page}
							containerClassName="pagination"
							activeClassName="pagination-active"
							pageClassName="pagination-item"
							previousClassName="pagination-previous"
							nextClassName="pagination-next"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
