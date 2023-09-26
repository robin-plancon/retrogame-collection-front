import './Header.scss';

import Logo from '../../../assets/logo.png';

function Header() {
	return (
		<div className="header">
			<a href="/" aria-label="Home">
				<img className="header-logo" src={Logo} alt="Logo" />
			</a>
			<div className="header-buttons">
				<button className="header-button" aria-label="bouton vers la page d'inscription">
					<a href="/signup">Inscription</a>
				</button>
				<button className="header-button" aria-label="bouton vers la page connexion">
					<a href="/signin">Connexion</a>
				</button>
			</div>
		</div>
	);
}

export default Header;
