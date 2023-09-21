import './About.scss';

import avatar from '../../../resources/avatar.jpg';

function About() {
	return (
		<div className="about">
			<h2 className="about-title">Le Projet</h2>
			<p className="about-resume">
				Ce projet vise à développer une plateforme de gestion de bibliothèque de jeux
				vidéo physique, en ayant à l&apos;esprit le <em>retro gaming</em>. Les
				utilisateurs pourront ajouter des jeux à leur collection et gérer une liste de
				souhaits.
			</p>
			<h2 className="about-title">L&apos;équipe</h2>
			<div className="team-card">
				<img src={avatar} alt="Avatar de John" className="team-card--image" />
				<h3 className="team-card--name">John</h3>
				<p className="team-card--role">Product Owner</p>
			</div>
		</div>
	);
}

export default About;
