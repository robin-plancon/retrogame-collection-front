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
import { resetGamesSearch, searchGamesByName } from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		// If the user is on the home page and the search bar is not empty
		if (history.location.pathname === '/' && searchTerm.trim() !== '') {
			// Search games by name in the API
			dispatch(searchGamesByName(searchTerm));
		}
		// If the user is on the collection page and the search bar is not empty
		if (history.location.pathname === '/collection' && searchTerm.trim() !== '') {
			// Search games by name in user's collection
			dispatch(searchCollection(searchTerm));
		}
		if (searchTerm.trim() === '') {
			// Reset the search state
			dispatch(resetGamesSearch());
			dispatch(resetCollectionSearch());
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
		window.location.href = '/';
	};

	// Click on the logo reset the search state and redirect to the home page
	const handleClick = () => {
		// If the user is on the home page
		if (history.location.pathname === '/') {
			// Reset the search state
			dispatch(resetGamesSearch());
			setSearchTerm('');
		}
		// If the user is on the collection page
		if (history.location.pathname === '/collection') {
			// Reset the search state
			dispatch(resetCollectionSearch());
			setSearchTerm('');
		}
	};

	const shouldDisplaySearchBar =
		history.location.pathname === '/' || history.location.pathname === '/collection';
	const isUserProfilePage = history.location.pathname === '/user/profile';
	const isCollectionPage = history.location.pathname === '/collection';

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
				{user && !isCollectionPage && (
					<NavLink to="/collection" className="header-button">
						Ma collection
					</NavLink>
				)}
				{user && !isUserProfilePage && (
					<NavLink to="/user/profile" className="header-button">
						Mon profil
					</NavLink>
				)}
				{user && (
					<button className="header-button" onClick={handleSignout}>
						Déconnexion
					</button>
				)}
			</div>
			{shouldDisplaySearchBar && (
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
			)}
		</div>
	);
}

export default Header;
