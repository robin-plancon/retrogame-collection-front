import './Signup.scss';

function Signup() {
	return (
		<div className="signup">
			<h1 className="signup-title">Inscription</h1>
			<form className="signup-form" /* onSubmit={handleSubmit} */>
				<label htmlFor="pseudo" className="signup-label">
					Pseudo
				</label>
				<input type="text" id="pseudo" name="pseudo" className="signup-input" />
				<label htmlFor="email" className="signup-label">
					Email
				</label>
				<input type="email" id="email" name="email" className="signup-input" />
				<label htmlFor="password" className="signup-label">
					Mot de passe
				</label>
				<input type="password" id="password" name="password" className="signup-input" />
				<label htmlFor="confirmPassword" className="signup-label">
					Confirmer le mot de passe
				</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					className="signup-input"
				/>
				<button type="submit" className="signup-button">
					Créer un compte
				</button>
			</form>
		</div>
	);
}

export default Signup;
