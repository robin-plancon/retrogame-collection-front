import './Collection.scss';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import platforms from '../../../data/platforms.json';
import arrowIcon from '../../assets/icons/arrow-circle-up.svg';
import ghostIcon from '../../assets/icons/ghost.svg';
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

	// Checks if there is a game to display
	const noGamesFound = !isLoading && searchResults && searchResults.length === 0;

	// Pagination - Number of games per page
	const gamesPerPage = 10;

	// Calculate page count
	const totalPages = Math.ceil(
		searchResults ? searchResults.length : games.length / gamesPerPage,
	);

	const [currentPage, setCurrentPage] = useState(0);

	const handlePageClick = (selected: { selected: number }) => {
		setCurrentPage(selected.selected);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const [showScrollButton, setShowScrollButton] = useState(false);

	const handleScrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleScroll = () => {
		// Check if the user has scrolled down by a certain amount
		if (window.scrollY > 700) {
			setShowScrollButton(true);
		} else {
			setShowScrollButton(false);
		}
	};

	useEffect(() => {
		// Add a scroll event listener to track scrolling
		window.addEventListener('scroll', handleScroll);
		return () => {
			// Remove the event listener when the component unmounts
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
					{noGamesFound && <p className="no-games-message">Aucun jeu à afficher</p>}
					{isLoading && games.length === 0 && (
						<img
							src={ghostIcon}
							alt="Chargement..."
							style={{ width: '150px', opacity: 0.8 }}
						/>
					)}
					{!isLoading && status === 'error' && (
						<p className="loading-error">Erreur lors du chargement des jeux.</p>
					)}
					{!isLoading && games.length === 0 && (
						<p className="no-games-collection">
							Il n y a aucun jeu dans votre collection :/
						</p>
					)}

					{searchResults
						? searchResults
								.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage)
								.map((game) => <GameCard key={game.id} game={game} />)
						: games
								.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage)
								.map((game) => <GameCard key={game.id} game={game} />)}
				</div>

				{totalPages > 1 && (
					<ReactPaginate
						breakLabel="..."
						nextLabel="Suivant"
						onPageChange={handlePageClick}
						pageCount={totalPages}
						pageRangeDisplayed={2}
						marginPagesDisplayed={2}
						previousLabel="Précédent"
						containerClassName="pagination"
						activeClassName="pagination-active"
						pageClassName="pagination-item"
						previousClassName="pagination-previous"
						nextClassName="pagination-next"
					/>
				)}
				{showScrollButton && (
					<div className="scroll-button-container">
						<button className="scroll-button" onClick={handleScrollUp}>
							<img src={arrowIcon} alt="Scroll to Top" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Collection;
