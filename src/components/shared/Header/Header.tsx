import './Header.scss';

import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../assets/icons/search-menthol.svg';
//import ToggleGameIcon from '../../../assets/icons/video-game.svg';
import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { resetStatus, signout } from '../../../store/reducers/auth';
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
	const isButtonActive = (path: string) => {
		return history.location.pathname === path;
	};

	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const { searchOptions } = useAppSelector((state) => state.games);
	const { searchOptions: searchCollectionOptions } = useAppSelector(
		(state) => state.collection,
	);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		if (searchTerm.trim() === '') {
			// If the search bar is empty we set the searchTerm to null
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

	// Declare a reference to the search field using useRef
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	// Handle click on the search icon
	const handleSearchIconClick = () => {
		// Check if the reference to the search field exists
		if (searchInputRef.current) {
			// Get the value of the search field
			const newSearchTerm = searchInputRef.current.value;

			// Update the search term
			setSearchTerm(newSearchTerm);

			// Call the search function
			handleSearch();
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
		// Redirect to the home page
		history.navigate('/');
	};

	const shouldDisplaySearchBar =
		history.location.pathname === '/' || history.location.pathname === '/collection';
	//const isUserProfilePage = history.location.pathname === '/user/profile';
	// const isCollectionPage = history.location.pathname === '/collection';
	// Click on the logo reset the search state and redirect to the home page
	const handleClick = () => {
		dispatch(resetStatus());
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
		dispatch(resetStatus());
		dispatch(resetCollectionSearch());
		setSearchTerm('');
	};

	const handleProfileClick = () => {
		dispatch(resetStatus());
		dispatch(resetCollectionSearch());
		setSearchTerm('');
	};

	useEffect(() => {
		// If the user is on the home page and the search bar is empty
		if (history.location.pathname === '/' && !searchOptions.searchTerm) {
			setSearchTerm('');
		}
		// If the user is on the collection page and the search bar is empty
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
					<NavLink
						to="/signup"
						className={`header-button ${isButtonActive('/signup') ? 'active' : ''}`}
						onClick={() => dispatch(resetStatus())}
					>
						Inscription
					</NavLink>
				)}
				{!user && (
					<NavLink
						to="/signin"
						state={{ from: history.location }}
						className={`header-button ${isButtonActive('/signup') ? 'active' : ''}`}
						onClick={() => dispatch(resetStatus())}
					>
						Connexion
					</NavLink>
				)}
				{user && (
					<NavLink
						to="/user/profile"
						className={`header-button ${isButtonActive('/signup') ? 'active' : ''}`}
						onClick={() => {
							handleProfileClick();
							if (window.location.pathname === '/user/profile') {
								window.location.reload();
							}
						}}
					>
						Profil
					</NavLink>
				)}
				{user && (
					<NavLink
						to="/collection"
						className={`header-button ${isButtonActive('/signup') ? 'active' : ''}`}
						onClick={handleCollectionClick}
					>
						Collection
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
						ref={searchInputRef}
						type="text"
						className="header-search-input"
						placeholder="Rechercher..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button
						className="header-search-icon-button"
						onClick={handleSearchIconClick}
						aria-label="Rechercher"
					>
						<img className="header-search-icon" src={searchIcon} alt="SearchIcon" />
					</button>
				</div>
			)}
		</div>
	);
}

export default Header;
