import './Signin.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetStatus, signin } from '../../store/reducers/user';
import { useEffect } from 'react';

type FormProps = {
	nickname?: string;
	password?: string;
};

function Signin() {
	// dispatch is a function that allows us to send an action to the store
	const dispacth = useAppDispatch();
	// navigate is a function that allows us to navigate to a specific route
	const navigate = useNavigate();

	// states from the store
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const status = useAppSelector((state) => state.user.status);
	const message = useAppSelector((state) => state.user.message);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		const { nickname, password } = data;
		const sendData = {
			nickname: nickname?.trim(),
			password: password,
		};
		// dispatch signin action with data from the form
		dispacth(signin(sendData));
	};

	useEffect(() => {
		if (status === 'ok') {
			// redirect to the home page and reset the status
			dispacth(resetStatus());
			navigate('/');
		}
	}, [status, dispacth, navigate]);

	return (
		<div className="signin">
			<h1 className="signin-title">Connexion</h1>
			{isLoading && <p>Chargement...</p>}
			{status === 'error' && <p>{message}</p>}
			<form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="pseudo" className="signin-label">
					Pseudo
				</label>
				<input
					type="text"
					id="nickname"
					className="signin-input"
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
							value: /^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/,
							message:
								'Le pseudo ne doit contenir que des lettres, des chiffres, des tirets et des underscores',
						},
					})}
				/>
				{errors.nickname && (
					<span className="signin-error">{errors.nickname.message as string}</span>
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
