import './Signup.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks/redux';
import { signup } from '../../store/reducers/user';

type FormProps = {
	pseudo?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

function Signup() {
	const dispacth = useAppDispatch();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const watchPassword: string = watch('password');

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		console.log(JSON.stringify(data));
		dispacth(signup(data));
	};

	return (
		<div className="signup">
			<h1 className="signup-title">Inscription</h1>
			<form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="pseudo" className="signup-label">
					Pseudo
				</label>
				<input
					type="text"
					id="pseudo"
					className="signup-input"
					{...register('pseudo', {
						required: 'Ce champ est requis',
						minLength: {
							value: 3,
							message: 'Le pseudo doit contenir au moins 3 caractères',
						},
						maxLength: {
							value: 20,
							message: 'Le pseudo doit contenir au maximum 20 caractères',
						},
						pattern: {
							value: /^[A-Za-z0-9]+$/i,
							message: 'Le pseudo ne doit contenir que des lettres et des chiffres',
						},
					})}
				/>
				{errors.pseudo && (
					<span className="signup-error">{errors.pseudo.message as string}</span>
				)}
				<label htmlFor="email" className="signup-label">
					Email
				</label>
				<input
					type="email"
					id="email"
					className="signup-input"
					{...register('email', {
						required: 'Ce champ est requis',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Adresse email invalide',
						},
					})}
				/>
				{errors.email && (
					<span className="signup-error">{errors.email.message as string}</span>
				)}
				<label htmlFor="password" className="signup-label">
					Mot de passe
				</label>
				<input
					type="password"
					id="password"
					className="signup-input"
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
					<span className="signup-error">{errors.password.message as string}</span>
				)}
				<label htmlFor="confirmPassword" className="signup-label">
					Confirmer le mot de passe
				</label>
				<input
					type="password"
					id="confirmPassword"
					className="signup-input"
					{...register('confirmPassword', {
						required: 'Ce champ est requis',
						validate: (value) => {
							return value === watchPassword || 'Les mots de passe ne correspondent pas';
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="signup-error">{errors.confirmPassword.message as string}</span>
				)}
				<button type="submit" className="signup-button">
					Créer un compte
				</button>
			</form>
		</div>
	);
}

export default Signup;
