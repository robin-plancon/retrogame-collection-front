import './Filter.scss';

import React, { useEffect, useState } from 'react';

import platforms from '../../../../data/platforms.json';
import filterIcon from '../../../assets/icons/filter.svg';

function Filter() {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const mediumBreakpoint = 1000;

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

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
					<h3 className="filter-menu--title">Consoles</h3>
					{platforms.map((platforms) => (
						<div className="filter-menu--submenu" key={platforms.platform_family}>
							<h4 className="filter-menu--subtitle">{platforms.platform_family}</h4>
							<div className="filter-menu--values">
								{platforms.platforms
									.sort((a, b) => (a.name > b.name ? 1 : -1))
									.map((platform) => (
										<button className="filter-menu--value" key={platform.id}>
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
