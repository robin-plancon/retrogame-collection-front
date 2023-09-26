import './Header.scss';

import { NavLink } from 'react-router-dom';

import Logo from '../../../assets/logo.png';

function Header() {
	return (
		<div className="header">
			<NavLink to="/" aria-label="Home">
				<img className="header-logo" src={Logo} alt="Logo" />
			</NavLink>
			<div className="header-buttons">
				<NavLink to="/signup" className={'header-button'}>
					Inscription
				</NavLink>
				<NavLink to="/signin" className={'header-button'}>
					Connexion
				</NavLink>
			</div>
		</div>
	);
}

export default Header;
