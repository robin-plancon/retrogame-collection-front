import './ResetPasswordMailForm.scss';

import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import closeIcon from '../../../assets/icons/close.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { resetPasswordMail } from '../../../store/reducers/auth';

type FormProps = {
	email?: string;
};

function ResetPasswordForm({
	setIsPasswordReset,
}: {
	setIsPasswordReset: Dispatch<SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();

	const { status } = useAppSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		shouldUseNativeValidation: false,
		reValidateMode: 'onSubmit',
	});

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		const { email } = data;
		const sendData = {
			email: email?.trim() || '', // provide a default value for email
		};
		dispatch(resetPasswordMail(sendData));
		if (status === 'ok') {
			setIsPasswordReset(false);
		}
	};

	const closePasswordResetModal = () => {
		setIsPasswordReset(false);
	};

	return (
		<div className="modal">
			<form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
				<button
					onClick={closePasswordResetModal}
					type="button"
					className="modal-close"
					aria-label="Fermer la modale"
				>
					<img src={closeIcon} alt="Fermer la modale" />
				</button>
				<h2 className="modal-title">Mot de passe oublié</h2>
				<label htmlFor="email" className="modal-label">
					Email
				</label>
				<input
					type="text"
					id="email"
					className="modal-input"
					{...register('email', {
						required: 'Ce champ est requis',
						pattern: {
							value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
							message: 'Adresse email invalide',
						},
					})}
				/>
				{errors.email && <p className="modal-error">{errors.email.message as string}</p>}
				{status === 'error' && <p className="modal-error">Email invalide</p>}
				<button type="submit" className="modal-button">
					Envoyer
				</button>
			</form>
		</div>
	);
}

export default ResetPasswordForm;
