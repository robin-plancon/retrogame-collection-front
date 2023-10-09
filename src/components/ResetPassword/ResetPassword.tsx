import './ResetPassword.scss';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { checkResetToken, resetPasswordWithToken } from '../../store/reducers/auth';

type FormProps = {
	password?: string;
	confirmation?: string;
	token?: string;
};

function ResetPassword() {
	const dispatch = useAppDispatch();
	const { search } = useLocation();
	const token = new URLSearchParams(search).get('token');

	const [isFirst, setIsFirst] = useState(true);
	const [isTokenValid, setIsTokenValid] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ shouldUseNativeValidation: false, reValidateMode: 'onSubmit' });

	const watchPassword: string = watch('password');

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		const { password, confirmation } = data;
		const sendData = {
			newPassword: password as string,
			confirmation: confirmation as string,
			token: token as string,
		};
		console.log(sendData);
		// dispatch signin action with data from the form
		dispatch(resetPasswordWithToken(sendData));
	};

	useEffect(() => {
		if (isFirst) {
			setIsFirst(false);
			return;
		}
		if (token) {
			dispatch(checkResetToken(token)).then((res) => {
				if (res.payload.status === 'Success') {
					setIsTokenValid(true);
				}
			});
		}
	}, [isFirst]);

	return (
		<>
			{isTokenValid && (
				<div className="reset">
					<h1 className="reset-title">Réinitialisation du mot de passe</h1>
					<form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="password" className="reset-label">
							Mot de passe
						</label>
						<input
							type="password"
							id="password"
							className="reset-input"
							{...register('password', {
								required: 'Mot de passe requis',
								minLength: {
									value: 8,
									message: '8 caractères minimum',
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
							<p className="reset-error">{errors.password.message as string}</p>
						)}
						<label htmlFor="confirmation" className="reset-label">
							Confirmer le mot de passe
						</label>
						<input
							type="password"
							id="confirmation"
							className="reset-input"
							{...register('confirmation', {
								required: 'Confirmation requise',
								validate: (value) => {
									return (
										value === watchPassword || 'Les mots de passe ne correspondent pas'
									);
								},
							})}
						/>
						{errors.confirmation && (
							<p className="reset-error">{errors.confirmation.message as string}</p>
						)}
						<button type="submit" className="reset-button">
							Envoyer
						</button>
					</form>
				</div>
			)}
			{!isTokenValid && token && (
				<div>
					<h1>Invalid token</h1>
				</div>
			)}
		</>
	);
}

export default ResetPassword;
