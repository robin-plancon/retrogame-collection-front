import './Home.scss';

import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

import platforms from '../../../data/platforms.json';
import { Game } from '../../@types/game';
import upIcon from '../../assets/icons/arrow-up.svg';
import ghostIcon from '../../assets/icons/ghost.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addSearchOptions, changePage } from '../../store/reducers/game';
import GameList from '../GameList/GameList';
import Filter from '../shared/Filter/Filter';

function Home() {
	const contentRef = useRef(null);
	const dispatch = useAppDispatch();
	const { isLoading, games, status, searchGames, searchOptions, pagination } =
		useAppSelector((state) => state.games);
	const [isFirst, setIsFirst] = useState(true);
	const [pageCount, setPageCount] = useState(0); // State to control the number of pages
	const [currentItems, setCurrentItems] = useState<Game[]>([]); // State to control the items to display
	const [showScrollButton, setShowScrollButton] = useState(false); // State to control the visibility of the scroll button

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
	}, [isFirst]);

	// Update the current items when the games change
	useEffect(() => {
		// Update the page count
		setPageCount(Math.ceil(games.length / pagination.pageSize));
		// Update items to display
		const itemOffset = pagination.pageSize * pagination.page;
		setCurrentItems(games.slice(itemOffset, itemOffset + pagination.pageSize));
	}, [games]);

	// Update the current items when the search results change
	useEffect(() => {
		// If there are search results, update the page count and items to display
		if (searchGames) {
			setPageCount(Math.ceil(searchGames.length / searchOptions.pageSize));
			const itemOffset = searchOptions.pageSize * searchOptions.page;
			setCurrentItems(searchGames.slice(itemOffset, itemOffset + searchOptions.pageSize));
			return;
		}
		// If there are no search results, update the page count and items to display
		setPageCount(Math.ceil(games.length / pagination.pageSize));
		const itemOffset = pagination.pageSize * pagination.page;
		setCurrentItems(games.slice(itemOffset, itemOffset + pagination.pageSize));
	}, [searchGames]);

	// Function to get the name of a platform from its id
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

	// Function to handle the pagination
	const handlePageClick = (event: { selected: number }) => {
		if (searchGames) {
			dispatch(addSearchOptions({ ...searchOptions, page: event.selected }));
			const newOffset = event.selected * searchOptions.pageSize;
			setCurrentItems(searchGames.slice(newOffset, newOffset + searchOptions.pageSize));
		} else {
			dispatch(changePage(event.selected));
			const newOffset = event.selected * pagination.pageSize;
			setCurrentItems(games.slice(newOffset, newOffset + pagination.pageSize));
		}

		// Scrolling up after clicking on one page
		if (contentRef.current) {
			(contentRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleScrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleScroll = () => {
		// Check if the user has scrolled down by a certain amount
		if (window.scrollY > 100) {
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
		<>
			<div className="home">
				<Filter />
				<div className="home" ref={contentRef}>
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
							<div className="games-cards">
								{isLoading && (
									<img
										src={ghostIcon}
										alt="Chargement..."
										style={{ width: '150px', opacity: 0.8 }}
									/>
								)}
								{!isLoading && status === 'error' && (
									<p>Erreur lors du chargement des jeux.</p>
								)}
								{!isLoading && currentItems.length === 0 && <p>Aucun jeu trouvé.</p>}

								{!isLoading && <GameList games={currentItems} />}
							</div>
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
							{showScrollButton && (
								<div className="scroll-button-container">
									<button className="scroll-button" onClick={handleScrollUp}>
										<img src={upIcon} alt="Scroll to Top" />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
