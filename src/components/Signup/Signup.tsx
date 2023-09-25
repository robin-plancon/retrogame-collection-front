import './Signup.scss';

function Signup() {
	return (
		<div className="signup">
			<h1 className="signup-title">Signup</h1>
			<form className="signup-form" /* onSubmit={handleSubmit} */>
				<label htmlFor="pseudo">Pseudo</label>
				<input type="text" id="pseudo" name="pseudo" />
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="password">Mot de passe</label>
				<input type="password" id="password" name="password" />
				<label htmlFor="confirmPassword">Confirmer le mot de passe</label>
				<input type="password" id="confirmPassword" name="confirmPassword" />
				<button type="submit">Créer un compte</button>
			</form>
		</div>
	);
}

export default Signup;
