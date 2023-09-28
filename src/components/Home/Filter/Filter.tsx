import './Filter.scss';

import React, { useState } from 'react';

import filterIcon from '../../../assets/icons/filter.svg';

function Filter() {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	return (
		<div className="filter-menu">
			<button
				className="filter-button"
				onClick={toggleFilter}
				aria-label="Ouvrir/Fermer le filtre"
			>
				<img src={filterIcon} alt="Filtrer" className="filter-icon" />
			</button>
			{isFilterOpen && (
				<div className="filter-section">
					<h3 className="filter-title">Consoles</h3>
					<p className="filter-value italic">Choix multiples</p>
				</div>
			)}
			{isFilterOpen && (
				<div className="filter-section">
					<h3 className="filter-title">Genres</h3>
					<p className="filter-value italic">Choix multiples</p>
				</div>
			)}
			{isFilterOpen && (
				<div className="filter-section">
					<h3 className="filter-title">Date de sortie</h3>
					<p className="filter-value italic">Champs nombre</p>
				</div>
			)}
		</div>
	);
}

export default Filter;
