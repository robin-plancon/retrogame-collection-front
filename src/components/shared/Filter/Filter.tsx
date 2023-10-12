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

	const { searchOptions } = useAppSelector((state) => state.games);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const mediumBreakpoint = 1000;

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// On récupère le bouton cliqué
		const clickedButton = e.target as HTMLButtonElement;

		if (clickedButton.classList.contains('selected')) {
			// Le bouton a déjà la classe "selected", donc on la supprime
			clickedButton.classList.remove('selected');
		} else {
			// Le bouton n'a pas la classe "selected", donc on l'ajoute
			clickedButton.classList.add('selected');
		}

		if (history.location.pathname === '/') {
			dispatch(
				addSearchOptions({
					...searchOptions,
					page: 0,
					platform: parseInt(clickedButton.value),
				}),
			);
			dispatch(searchGames());
		}

		if (history.location.pathname === '/collection') {
			dispatch(
				addSearchCollectionOptions({
					...searchOptions,
					platform: parseInt(clickedButton.value),
					page: 0,
				}),
			);
			dispatch(searchCollection());
		}
	};

	const [platformSubMenuState, setPlatformSubMenuState] = useState<{
		[key: string]: boolean;
	}>({});

	const getCurrentDimensions = () => {
		return {
			width: window.innerWidth,
		};
	};

	const [currentWidth, setCurrentWidth] = useState(getCurrentDimensions().width);

	useEffect(() => {
		const updateDimensions = () => {
			setCurrentWidth(getCurrentDimensions().width);
		};
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [currentWidth]);

	const toggleSubMenu = (platformFamily: string) => {
		setPlatformSubMenuState((prevState) => ({
			...prevState,
			[platformFamily]: !prevState[platformFamily],
		}));
	};

	const handleReset = () => {
		dispatch(resetGamesSearch());
		dispatch(resetCollectionSearch());
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
					<button className="filter-menu--reset" onClick={handleReset}>
						réinitialiser les filtres
					</button>
					<h3 className="filter-menu--title">Consoles</h3>
					{platforms.map((platforms) => (
						<div className="filter-menu--submenu" key={platforms.platform_family}>
							<button
								className="filter-menu--subtitle"
								onClick={() => toggleSubMenu(platforms.platform_family)}
							>
								{platforms.platform_family}
							</button>
							<div className="filter-menu--values">
								{platformSubMenuState[platforms.platform_family] &&
									platforms.platforms
										.sort((a, b) => (a.name > b.name ? 1 : -1))
										.map((platform) => (
											<button
												className="filter-menu--value"
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
		</div>
	);
}

export default Filter;
