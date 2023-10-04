import './Header.scss';

import React, { KeyboardEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../assets/icons/search.svg';
import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/auth';
import { resetCollection } from '../../../store/reducers/collection';
import { resetSearch, searchGamesByName } from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		if (history.location.pathname === '/') {
			dispatch(searchGamesByName(searchTerm));
		}
		if (history.location.pathname === '/collection') {
			dispatch(searchGamesByName(searchTerm));
		}
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleSignout = () => {
		dispatch(resetCollection());
		dispatch(signout());
	};

	const handleClick = () => {
		if (history.location.pathname === '/') {
			dispatch(resetSearch());
			setSearchTerm('');
		}
		if (history.location.pathname === '/collection') {
			dispatch(resetSearch());
			setSearchTerm('');
		}
	};

	return (
		<div className="header">
			<NavLink to="/" aria-label="Home" onClick={handleClick}>
				<img className="header-logo" src={Logo} alt="Logo" />
			</NavLink>
			<div className="search-bar">
				<input
					type="text"
					className="search-input"
					placeholder="Rechercher..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<img className="search-icon" src={searchIcon} alt="SearchIcon" />
			</div>
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
					<button className="header-button" onClick={handleSignout}>
						Déconnexion
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
