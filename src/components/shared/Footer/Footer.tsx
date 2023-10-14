import './Footer.scss';

import { Link, useLocation } from 'react-router-dom';

function Footer() {
	const location = useLocation();
	const isHomePage = location.pathname === '/' || location.pathname === '/collection';

	return (
		<footer className={`footer ${isHomePage ? 'home-footer' : ''}`}>
			<Link to="/about" className="footer-link">
				A propos
			</Link>
			<p className="footer-text">©2023 RetrO&apos;Game Collection</p>
		</footer>
	);
}

export default Footer;
