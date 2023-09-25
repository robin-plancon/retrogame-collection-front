import './Signup.scss';

import Input from '../utils/Input/Input';

function Signup() {
	return (
		<div className="signup">
			<h1 className="signup-title">Inscription</h1>
			<form className="signup-form" /* onSubmit={handleSubmit} */>
				<Input type="text" id="pseudo" name="pseudo" label="Pseudo" className="signup" />
				<Input type="email" id="email" name="email" label="Email" className="signup" />
				<Input
					type="password"
					id="password"
					name="password"
					label="Mot de passe"
					className="signup"
				/>
				<Input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					label="Confirmer le mot de passe"
					className="signup"
				/>
				<button type="submit" className="signup-button">
					Créer un compte
				</button>
			</form>
		</div>
	);
}

export default Signup;
