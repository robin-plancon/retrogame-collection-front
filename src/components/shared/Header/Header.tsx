import './Header.scss';

import React, { KeyboardEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../assets/icons/search-menthol.svg';
//import gameIcon from '../../../assets/icons/video-game.svg';
import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/auth';
import {
	addSearchCollectionOptions,
	resetCollection,
	resetCollectionSearch,
	searchCollection,
} from '../../../store/reducers/collection';
import { addSearchOptions, searchGames } from '../../../store/reducers/game';
//import { resetGamesSearch } from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const { searchOptions } = useAppSelector((state) => state.games);
	const { searchOptions: searchCollectionOptions } = useAppSelector(
		(state) => state.collection,
	);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		if (searchTerm.trim() === '') {
			// Reset the search state
			dispatch(addSearchOptions({ ...searchOptions, searchTerm: null }));
			dispatch(
				addSearchCollectionOptions({ ...searchCollectionOptions, searchTerm: null }),
			);
		}
		if (history.location.pathname === '/') {
			// Search games by name in the API
			dispatch(addSearchOptions({ ...searchOptions, searchTerm: searchTerm, page: 0 }));
			dispatch(searchGames());
			return;
		}
		// If the user is on the collection page and the search bar is not empty
		if (history.location.pathname === '/collection') {
			// Search games by name in user's collection
			dispatch(
				addSearchCollectionOptions({
					...searchCollectionOptions,
					searchTerm: searchTerm,
					page: 0,
				}),
			);
			dispatch(searchCollection());
			return;
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
		dispatch(resetCollectionSearch());
		// Sign out the user
		dispatch(signout());
		history.navigate('/');
	};

	const shouldDisplaySearchBar =
		history.location.pathname === '/' || history.location.pathname === '/collection';
	const isUserProfilePage = history.location.pathname === '/user/profile';
	// const isCollectionPage = history.location.pathname === '/collection';
	// Click on the logo reset the search state and redirect to the home page
	const handleClick = () => {
		// If the user is on the home page
		if (history.location.pathname === '/') {
			// Reset the search state
			//dispatch(resetGamesSearch());
			//setSearchTerm('');
			window.location.reload();
		}
		// If the user is on the collection page
		if (history.location.pathname === '/collection') {
			// Reset the search state
			dispatch(resetCollectionSearch());
			setSearchTerm('');
		}
	};

	const handleCollectionClick = () => {
		dispatch(resetCollectionSearch());
		setSearchTerm('');
	};

	useEffect(() => {
		if (history.location.pathname === '/' && !searchOptions.searchTerm) {
			setSearchTerm('');
		}
		if (
			history.location.pathname === '/collection' &&
			!searchCollectionOptions.searchTerm
		) {
			setSearchTerm('');
		}
	}, [searchOptions, searchCollectionOptions]);

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
				{user && !isUserProfilePage && (
					<NavLink to="/user/profile" className="header-button">
						Mon profil
					</NavLink>
				)}
				{user && (
					<NavLink
						to="/collection"
						className="header-button"
						onClick={handleCollectionClick}
					>
						Ma collection
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
