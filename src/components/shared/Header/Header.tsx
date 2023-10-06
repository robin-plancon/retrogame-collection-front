import './Header.scss';

import React, { KeyboardEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../assets/icons/search.svg';
import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/auth';
import {
	resetCollection,
	resetCollectionSearch,
	searchCollection,
} from '../../../store/reducers/collection';
import {
	addSearchOptions,
	resetGamesSearch,
	resetSearchOptions,
	searchGames,
} from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		// If the user is on the home page and the search bar is not empty
		if (history.location.pathname === '/') {
			// Search games by name in the API
			dispatch(addSearchOptions({ searchTerm: searchTerm }));
			dispatch(searchGames());
		}
		// If the user is on the collection page and the search bar is not empty
		if (history.location.pathname === '/collection') {
			// Search games by name in user's collection
			dispatch(searchCollection(searchTerm));
		}
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		// If the user presses the Enter key
		if (e.key === 'Enter') {
			// Call the handleSearch function
			handleSearch();
		}
	};

	// To sign out the user
	const handleSignout = () => {
		// Reset the collection state
		dispatch(resetCollection());
		// Sign out the user
		dispatch(signout());
	};

	// Click on the logo reset the search state and redirect to the home page
	const handleClick = () => {
		// If the user is on the home page
		if (history.location.pathname === '/') {
			// Reset the search state
			dispatch(resetGamesSearch());
			dispatch(resetSearchOptions());
			setSearchTerm('');
		}
		// If the user is on the collection page
		if (history.location.pathname === '/collection') {
			// Reset the search state
			dispatch(resetCollectionSearch());
			dispatch(resetSearchOptions());
			setSearchTerm('');
		}
	};

	return (
		<div className="header">
			<NavLink to="/" aria-label="Home" onClick={handleClick}>
				<img className="header-logo" src={Logo} alt="Logo" />
			</NavLink>
			<div className="header-buttons">
				{!user && (
					<NavLink to="/signup" className="header-button">
						Inscription
					</NavLink>
				)}
				{!user && (
					<NavLink
						to="/signin"
						state={{ from: history.location }}
						className="header-button"
					>
						Connexion
					</NavLink>
				)}
				{user && (
					<NavLink to="/collection" className="header-button">
						Ma collection
					</NavLink>
				)}
				{user && (
					<button className="header-button" onClick={handleSignout}>
						Déconnexion
					</button>
				)}
			</div>
			<div className="header-search-bar">
				<input
					type="text"
					className="header-search-input"
					placeholder="Rechercher..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<img className="header-search-icon" src={searchIcon} alt="SearchIcon" />
			</div>
		</div>
	);
}

export default Header;
