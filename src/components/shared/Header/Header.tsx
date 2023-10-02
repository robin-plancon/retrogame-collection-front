import './Header.scss';

import { NavLink } from 'react-router-dom';

import Logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signout } from '../../../store/reducers/auth';
import { history } from '../../../utils/history';

function Header() {
	const user = useAppSelector((state) => state.auth.user);
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
				{!user && (
					<NavLink to="/signup" className={'header-button'}>
						Inscription
					</NavLink>
				)}
				{!user && (
					<NavLink
						to="/signin"
						state={{ from: history.location }}
						className={'header-button'}
					>
						Connexion
					</NavLink>
				)}
				{user && (
					<button className={'header-button'} onClick={handleSignout}>
						Déconnexion
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
