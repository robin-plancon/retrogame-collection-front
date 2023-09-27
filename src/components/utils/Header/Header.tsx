import './Header.scss';

import { NavLink } from 'react-router-dom';

import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/user';

function Header() {
	const nickname = useAppSelector((state) => state.user.nickname);
	const dispatch = useAppDispatch();

	const handleSignout = () => {
		dispatch(signout());
	};

	return (
		<div className="header">
			<NavLink to="/" aria-label="Home">
				<img className="header-logo" src={Logo} alt="Logo" />
			</NavLink>
			<div className="header-buttons">
				{!nickname && (
					<NavLink to="/signup" className={'header-button'}>
						Inscription
					</NavLink>
				)}
				{!nickname && (
					<NavLink to="/signin" className={'header-button'}>
						Connexion
					</NavLink>
				)}
				{nickname && (
					<button className={'header-button'} onClick={handleSignout}>
						Déconnexion
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
