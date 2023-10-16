import './Filter.scss';

import React, { useEffect, useState } from 'react';

import platforms from '../../../../data/platforms.json';
import filterIcon from '../../../assets/icons/filter.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
	addSearchCollectionOptions,
	resetCollectionSearch,
	searchCollection,
} from '../../../store/reducers/collection';
import {
	addSearchOptions,
	resetGamesSearch,
	searchGames,
} from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Filter() {
	const dispatch = useAppDispatch();

	const { searchOptions, isLoading } = useAppSelector((state) => state.games);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const mediumBreakpoint = 1000;

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	// Initialize a state variable 'activePlatformId' to keep track of the currently active platform ID. It's initially set to null.
	const [activePlatformId, setActivePlatformId] = useState<number | null>(null);

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// Extract the platform ID from the clicked button
		const platformId = parseInt(e.currentTarget.value);
		// Update 'activePlatformId' with the ID of the selected platform
		setActivePlatformId(platformId);
		// Set 'activePlatformId' to the newly selected platform's ID, which helps track the active platform button.

		if (history.location.pathname === '/') {
			await dispatch(
				addSearchOptions({
					...searchOptions,
					page: 0,
					platform: parseInt((e.target as HTMLButtonElement).value),
				}),
			);
			await dispatch(searchGames());
		}
		if (history.location.pathname === '/collection') {
			await dispatch(
				addSearchCollectionOptions({
					...searchOptions,
					platform: parseInt((e.target as HTMLButtonElement).value),
					page: 0,
				}),
			);
			await dispatch(searchCollection());
		}
	};

	// Local state to track the open/closed state of sub-menus by platform name.
	const [platformSubMenuState, setPlatformSubMenuState] = useState<{
		[key: string]: boolean;
	}>({});

	// Get the current width of the window to display the clickable filter button only on mobile
	const getCurrentDimensions = () => {
		return {
			width: window.innerWidth,
		};
	};

	// State to update the current width of the window when it is resized
	const [currentWidth, setCurrentWidth] = useState(getCurrentDimensions().width);

	useEffect(() => {
		// Update the current width of the window when it is resized
		const updateDimensions = () => {
			setCurrentWidth(getCurrentDimensions().width);
		};
		// Add an event listener to the window to update the current width when it is resized
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [currentWidth]);

	// Function to toggle the open/closed state of a submenu
	const toggleSubMenu = (platformFamily: string) => {
		setPlatformSubMenuState((prevState) => ({
			...prevState,
			[platformFamily]: !prevState[platformFamily],
		}));
	};

	const handleReset = async () => {
		dispatch(resetGamesSearch());
		dispatch(resetCollectionSearch());
		setActivePlatformId(null); // Reset the active button on click of the button "reintialiser les filtres"
	};

	return (
		<div className="filter-menu">
			{currentWidth < mediumBreakpoint && (
				<button
					className="filter-menu--button"
					onClick={toggleFilter}
					aria-label="Ouvrir/Fermer le filtre"
				>
					<img src={filterIcon} alt="Filtrer" className="filter-menu--icon" />
				</button>
			)}
			{currentWidth >= mediumBreakpoint && (
				<img src={filterIcon} alt="Filtrer" className="filter-menu--icon" />
			)}
			{(isFilterOpen || currentWidth >= mediumBreakpoint) && (
				<div className="filter-menu--section">
					<button
						className={
							isLoading ? 'filter-menu--reset deactivated' : 'filter-menu--reset'
						}
						onClick={handleReset}
						disabled={isLoading}
					>
						réinitialiser les filtres
					</button>
					<h3 className="filter-menu--title">Consoles</h3>
					{platforms.map((platforms) => (
						<div className="filter-menu--submenu" key={platforms.platform_family}>
							<button
								className="filter-menu--subtitle"
								onClick={() => toggleSubMenu(platforms.platform_family)} // Handle the submenu on click
							>
								{platforms.platform_family}
							</button>
							<div className="filter-menu--values">
								{platformSubMenuState[platforms.platform_family] && // Display informations when the submenu is open
									platforms.platforms
										.sort((a, b) => (a.name > b.name ? 1 : -1))
										.map((platform) => (
											<button
												className={`filter-menu--value ${
													activePlatformId === platform.id ? 'active' : ''
												}`}
												key={platform.id}
												onClick={handleClick}
												value={platform.id}
											>
												{platform.name}
											</button>
										))}
							</div>
						</div>
					))}
				</div>
			)}
			{/* {(isFilterOpen || currentWidth >= mediumBreakpoint) && (
        <div className="filter-menu--section">
          <h3 className="filter-menu--title">Genres</h3>
          <p className="filter-menu--value italic">Choix multiples</p>
        </div>
      )}
      {(isFilterOpen || currentWidth >= mediumBreakpoint) && (
        <div className="filter-menu--section">
          <h3 className="filter-menu--title">Date de sortie</h3>
          <p className="filter-menu--value italic">Champs nombre</p>
        </div>
      )} */}
		</div>
	);
}

export default Filter;
