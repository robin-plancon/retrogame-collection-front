import './Signup.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

// import { useAppDispatch } from '../../hooks/redux';
// import { signup } from '../../store/reducers/user';

type FormProps = {
	nickname?: string;
	email?: string;
	password?: string;
	confirmation?: string;
};

function Signup() {
	// dispatch is a function that allows us to send an action to the store
	// const dispacth = useAppDispatch();
	// register is a function that allows us to register a field in the form
	// handleSubmit is a function that allows us to handle the form submission
	// watch is a function that allows us to watch the value of a field
	// formState is an object that contains the state of the form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// watch to get the value of the password field to compare it with the confirmation field
	const watchPassword: string = watch('password');

	// onSubmit is a function that will be called when the form is submitted
	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		const { nickname, email, password, confirmation } = data;
		const sendData = {
			nickname: nickname?.trim(),
			email: email?.trim(),
			password: password,
			confirmation: confirmation,
		};
		console.log(JSON.stringify(sendData));
		// dispatch signup action with data from the form
		// dispacth(signup(data));
	};

	return (
		<div className="signup">
			<h1 className="signup-title">Inscription</h1>
			<form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="nickname" className="signup-label">
					Pseudo
				</label>
				<input
					type="text"
					id="nickname"
					className="signup-input"
					{...register('nickname', {
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
				{errors.nickname && (
					<span className="signup-error">{errors.nickname.message as string}</span>
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
							value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
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
				<label htmlFor="confirmation" className="signup-label">
					Confirmer le mot de passe
				</label>
				<input
					type="password"
					id="confirmation"
					className="signup-input"
					{...register('confirmation', {
						required: 'Ce champ est requis',
						validate: (value) => {
							return value === watchPassword || 'Les mots de passe ne correspondent pas';
						},
					})}
				/>
				{errors.confirmation && (
					<span className="signup-error">{errors.confirmation.message as string}</span>
				)}
				<button type="submit" className="signup-button">
					Créer un compte
				</button>
			</form>
		</div>
	);
}

export default Signup;
