import './UserProfile.scss';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import closeIcon from '../../assets/icons/close.svg';
import mushroom from '../../assets/icons/mushroom.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { remove, signout, update } from '../../store/reducers/auth';

type FormProps = {
	currentPassword?: string;
	newPassword?: string;
	confirmation?: string;
};

const UserProfile = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		shouldUseNativeValidation: false,
		reValidateMode: 'onSubmit',
	});

	const watchPassword: string = watch('newPassword');

	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	// const [currentPassword, setCurrentPassword] = useState('');
	// const [newPassword, setNewPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	// const [errorText, setErrorText] = useState('');
	const userDetails = useAppSelector((state) => state.auth);

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		if (userDetails.user && userDetails.token) {
			const { currentPassword, newPassword, confirmation } = data;
			// dispatch action to change password
			dispatch(
				update({
					currentPassword: currentPassword,
					newPassword: newPassword,
					confirmation: confirmation,
				}),
			).then((resultAction) => {
				const { error, message } = resultAction.payload;
				if (!error) {
					setTimeout(() => {
						setIsSuccessModalOpen(true);
						closePasswordModal();
						// dispatch(signout());
					}, 1000);
				} else {
					console.error(message);
				}
			});
		}
	};

	const handleDelete = () => {
		console.log('handleDelete');
		if (userDetails.user && userDetails.token) {
			// Dispatch action to delete the account
			dispatch(remove()).then((resultAction) => {
				const { error, message } = resultAction.payload;
				if (!error) {
					console.log('Account deleted successfully');
					setIsDeleteModalOpen(true);
					console.log('isSuccessModalOpen set to true');
					setTimeout(() => {
						dispatch(signout());
						window.location.href = '/';
					}, 2000);
				} else {
					console.error(message);
				}
			});
		}
	};

	const openPasswordModal = () => {
		setIsPasswordModalOpen(true);
	};

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};

	const closePasswordModal = () => {
		// Reset the fields and the error message
		// setErrorText('');
		reset({
			currentPassword: '',
			newPassword: '',
			confirmation: '',
		});
		setIsPasswordModalOpen(false);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<Link to="/user/profile" className="user-profile">
			<div className="user-profile--card">
				<div className="user-profile--header">
					<img src={mushroom} alt="Mushroom" className="user-profile--icon" />
					<h1 className="user-profile--title">Mes informations personnelles</h1>
				</div>
				<div className="user-profile--info">
					<p className="user-profile--label">Pseudo</p>
					<p className="user-profile--value">{userDetails.user?.nickname}</p>
				</div>
				<div className="user-profile--info">
					<p className="user-profile--label">Email</p>
					<p className="user-profile--value">{userDetails.user?.email}</p>
				</div>
				<button className="user-profile--button" onClick={openPasswordModal}>
					Changer le mot de passe
				</button>
				{isPasswordModalOpen && (
					<div className="modal">
						<div className="modal-content">
							<h2>Mettez votre mot de passe à jour</h2>
							<button
								onClick={closePasswordModal}
								className="modal-close"
								aria-label="Fermer la modale"
							>
								<img src={closeIcon} alt="Fermer la modale" />
							</button>
							<form className="change-password-form">
								<input
									type="password"
									placeholder="Mot de passe actuel"
									{...register('currentPassword', {
										required: 'Ce champ est requis',
									})}
								/>
								{errors.currentPassword && (
									<p className="error-text">{errors.currentPassword.message as string}</p>
								)}
								<input
									type="password"
									placeholder="Nouveau mot de passe"
									{...register('newPassword', {
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
								{errors.newPassword && (
									<p className="error-text">{errors.newPassword.message as string}</p>
								)}
								<input
									type="password"
									placeholder="Confirmer le mot de passe"
									{...register('confirmation', {
										required: 'Ce champ est requis',
										validate: (value) => {
											return (
												value === watchPassword ||
												'Les mots de passe ne correspondent pas'
											);
										},
									})}
								/>
								{errors.confirmation && (
									<p className="error-text">{errors.confirmation.message as string}</p>
								)}

								<button className="modal-button" onClick={handleSubmit(onSubmit)}>
									Confirmer
								</button>
								<button type="button" className="modal-link" onClick={closePasswordModal}>
									Annuler
								</button>
							</form>
						</div>
					</div>
				)}
				{isSuccessModalOpen && (
					<div className="modal success-modal">
						<div className="modal-content">
							<h2>Votre mot de passe a été modifié avec succès !</h2>
							<button
								type="button"
								onClick={() => setIsSuccessModalOpen(false)}
								className="modal-closed"
								aria-label="Fermer la modale"
							>
								<img src={closeIcon} alt="Fermer la modale" />
							</button>
						</div>
					</div>
				)}
				<button className="user-profile--button" onClick={openDeleteModal}>
					Supprimer le compte
				</button>
				{isDeleteModalOpen && (
					<div className="window">
						<div className="window-content">
							<h2>Êtes-vous sûr(e) de vouloir supprimer ce compte ?</h2>
							<button type="button" className="window-button" onClick={handleDelete}>
								Confirmer
							</button>
							<button type="button" className="window-link" onClick={closeDeleteModal}>
								Annuler
							</button>
						</div>
					</div>
				)}
			</div>
		</Link>
	);
};

export default UserProfile;
