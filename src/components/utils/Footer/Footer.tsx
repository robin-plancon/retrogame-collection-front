import './Footer.scss';

import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="footer">
			<Link to="/about" className="footer-link">
				A propos
			</Link>
			<p className="footer-content">©2023 RetrO&apos;Game Collection</p>
		</footer>
	);
}

export default Footer;
