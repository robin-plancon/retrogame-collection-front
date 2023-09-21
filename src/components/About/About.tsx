import './About.scss';

import avatar from '../../../resources/avatar.jpg';
import TeamCard from './TeamCard/TeamCard';

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
			<div className="about-team">
				<TeamCard avatar={avatar} />
				<TeamCard avatar={avatar} />
				<TeamCard avatar={avatar} />
				<TeamCard avatar={avatar} />
				<TeamCard avatar={avatar} />
			</div>
		</div>
	);
}

export default About;
