import './TeamCard.scss';

interface TeamCardProps {
	avatar: string;
}

function TeamCard({ avatar }: TeamCardProps) {
	return (
		<div className="team-card">
			<img src={avatar} alt="Avatar de John" className="team-card--image" />
			<h3 className="team-card--name">John</h3>
			<p className="team-card--role">Product Owner</p>
		</div>
	);
}

export default TeamCard;
