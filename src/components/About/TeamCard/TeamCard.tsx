import './TeamCard.scss';

interface TeamCardProps {
	avatar: string;
	name: string;
	projectRole: string;
}

// TeamCard component.
// This component is used in About.tsx. It displays a team member's avatar, name and project role.
function TeamCard({ avatar, name, projectRole }: TeamCardProps) {
	return (
		<div className="team-card">
			<img src={avatar} alt={`avatar de ${name}`} className="team-card--image" />
			<h3 className="team-card--name">{name}</h3>
			<p className="team-card--role">{projectRole}</p>
		</div>
	);
}

export default TeamCard;
