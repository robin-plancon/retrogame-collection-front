import './About.scss';

import florian from '../../assets/avatar/florian.jpg';
import laetitia from '../../assets/avatar/laetitia.jpg';
import lionel from '../../assets/avatar/lionel.jpg';
import robin from '../../assets/avatar/robin.jpg';
import vanessa from '../../assets/avatar/vanessa.jpg';
import TeamCard from './TeamCard/TeamCard';

// About component.
// This component is used in /about route. It displays a description of the project and the team members.
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
				<TeamCard avatar={robin} name="Robin Plançon" projectRole="Product Owner" />
				<TeamCard
					avatar={laetitia}
					name="Laetitia Phommarath"
					projectRole="Lead Dev front"
				/>
				<TeamCard avatar={vanessa} name="Vanessa Slama" projectRole="Scrum Master" />
				<TeamCard avatar={lionel} name="Lionel Bouldoyré" projectRole="Git Master" />
				<TeamCard avatar={florian} name="Florian Corlu" projectRole="Lead Dev Back" />
			</div>
		</div>
	);
}

export default About;
