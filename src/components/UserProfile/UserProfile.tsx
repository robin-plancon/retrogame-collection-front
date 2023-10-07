import './UserProfile.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import closeIcon from '../../assets/icons/close.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { remove, signout, update } from '../../store/reducers/auth';

const UserProfile = () => {
	const dispatch = useAppDispatch();

	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [errorText, setErrorText] = useState('');
	const userDetails = useAppSelector((state) => state.auth);

	const handlePasswordChange = () => {
		console.log('handlePasswordChange');
		if (userDetails.user && userDetails.token) {
			if (
				!currentPassword ||
				!newPassword ||
				!confirmPassword ||
				newPassword !== confirmPassword
			) {
				setErrorText(
					'Oops ! Assurez-vous que le mot de passe contient au min :8, au max: 14 caractères, au moins une majuscule, une minuscule, un chiffre et un caractère spécial. Tous les champs doivent être renseignés.',
				);
			} else {
				// dispatch action to change password
				dispatch(
					update({
						currentPassword: currentPassword,
						newPassword: newPassword,
						confirmation: confirmPassword,
					}),
				).then((resultAction) => {
					const { error, message } = resultAction.payload;
					if (!error) {
						setIsSuccessModalOpen(true);
						dispatch(signout());
						setTimeout(() => {
							window.location.href = '/';
						}, 3000);
					} else {
						console.error(message);
					}
				});
			}
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
					setIsSuccessModalOpen(true);
					dispatch(signout());
					window.location.href = '/';
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
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setErrorText('');
		setIsPasswordModalOpen(false);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<Link to="/user/profile" className="user-profile">
			<div className="user-profile--card">
				<h1 className="user-profile--title">Mes informations personnelles</h1>
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
							<input
								type="password"
								placeholder="Mot de passe actuel"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Nouveau mot de passe"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Confirmer le mot de passe"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{errorText && (
								<div className="error-text">
									<p>{errorText}</p>
								</div>
							)}
							<button className="modal-button" onClick={handlePasswordChange}>
								Confirmer
							</button>
							<button className="modal-link" onClick={closePasswordModal}>
								Annuler
							</button>
						</div>
					</div>
				)}
				{isSuccessModalOpen && (
					<div className="modal success-modal">
						<div className="modal-content">
							<h2>Votre mot de passe a été modifié avec succès !</h2>
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
							<button className="window-button" onClick={handleDelete}>
								Confirmer
							</button>
							<button className="window-link" onClick={closeDeleteModal}>
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
