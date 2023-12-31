import './Signup.scss';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetStatus, signup } from '../../store/reducers/auth';
import { history } from '../../utils/history';

type FormProps = {
	nickname?: string;
	email?: string;
	password?: string;
	confirmation?: string;
};

function Signup() {
	// dispatch is a function that allows us to send an action to the store
	const dispacth = useAppDispatch();

	// redirect to the home page if the user is logged in
	const user = useAppSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			history.navigate('/');
		}
	}, [user]);

	// states from the store
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const status = useAppSelector((state) => state.auth.status);
	const message = useAppSelector((state) => state.auth.message);
	// register is a function that allows us to register a field in the form
	// handleSubmit is a function that allows us to handle the form submission
	// watch is a function that allows us to watch the value of a field
	// formState is an object that contains the state of the form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		shouldUseNativeValidation: false,
		reValidateMode: 'onSubmit',
	});

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
		// dispatch signup action with data from the form
		dispacth(signup(sendData));
	};

	useEffect(() => {
		if (status === 'ok') {
			// redirect to the home page and reset the status
			dispacth(resetStatus());
			history.navigate('/signin');
		}
	}, [status, dispacth]);

	return (
		<div className="signup">
			<h1 className="signup-title">Inscription</h1>
			{isLoading && <p>Chargement...</p>}
			{status === 'error' && <p className="signin-error">{message}</p>}
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
							value: 2,
							message: 'Le pseudo doit contenir au moins 2 caractères',
						},
						maxLength: {
							value: 14,
							message: 'Le pseudo doit contenir au maximum 14 caractères',
						},
						pattern: {
							value: /^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/,
							message:
								'Le pseudo ne doit contenir que des lettres, des chiffres, des tirets et des underscores',
						},
					})}
				/>
				{errors.nickname && (
					<p className="signup-error">{errors.nickname.message as string}</p>
				)}
				<label htmlFor="email" className="signup-label">
					Email
				</label>
				<input
					type="text"
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
				{errors.email && <p className="signup-error">{errors.email.message as string}</p>}
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
							value: 8,
							message: 'Le mot de passe doit contenir au moins 8 caractères',
						},
						maxLength: {
							value: 14,
							message: 'Le mot de passe doit contenir au maximum 14 caractères',
						},
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i,
							message:
								'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
						},
					})}
				/>
				{errors.password && (
					<p className="signup-error">{errors.password.message as string}</p>
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
					<p className="signup-error">{errors.confirmation.message as string}</p>
				)}
				<button type="submit" className="signup-button">
					Créer un compte
				</button>
			</form>
		</div>
	);
}

export default Signup;
