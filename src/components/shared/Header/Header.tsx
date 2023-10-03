import './Header.scss';

import React, { KeyboardEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../assets/icons/search.svg';
import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/auth';
import { resetCollection } from '../../../store/reducers/collection';
import { getGamesByName } from '../../../store/reducers/game';
import { history } from '../../../utils/history';

function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handleSearch = () => {
		dispatch(getGamesByName(searchTerm));
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

	return (
		<div className="header">
			<NavLink to="/" aria-label="Home">
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
