import './Header.scss';

import Logo from '../../../assets/logo.png';

function Header() {
	return (
		<div className="header">
			<a href="/" aria-label="Home">
				<img className="header-logo" src={Logo} alt="Logo" />
			</a>
		</div>
	);
}

export default Header;
