import './Signin.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

type FormProps = {
	email?: string;
	password?: string;
};

function Signin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		console.log(JSON.stringify(data));
	};

	return (
		<div className="signin">
			<h1 className="signin-title">Connexion</h1>
			<form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email" className="signin-label">
					Email
				</label>
				<input
					type="email"
					id="email"
					className="signin-input"
					{...register('email', {
						required: 'Ce champ est requis',
						pattern: {
							value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
							message: 'Adresse email invalide',
						},
					})}
				/>
				{errors.email && (
					<span className="signin-error">{errors.email.message as string}</span>
				)}
				<label htmlFor="password" className="signin-label">
					Mot de passe
				</label>
				<input
					type="password"
					id="password"
					className="signin-input"
					{...register('password', {
						required: 'Ce champ est requis',
						minLength: {
							value: 6,
							message: 'Le mot de passe doit contenir au moins 6 caractères',
						},
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i,
							message:
								'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
						},
					})}
				/>
				{errors.password && (
					<span className="signin-error">{errors.password.message as string}</span>
				)}
				<button type="submit" className="signin-button">
					Se connecter
				</button>
			</form>
		</div>
	);
}

export default Signin;
