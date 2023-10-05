import './UserProfile.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import closeIcon from '../../assets/icons/close.svg';
import { detail as fetchUserDetails } from '../../store/reducers/user';
// import { history } from '../../utils/history';

const UserProfile = () => {
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.user);

	useEffect(() => {
		// Loading the user informations when landing on the user profile
		dispatch(fetchUserDetails());
	}, [dispatch]);

	const openPasswordModal = () => {
		setIsPasswordModalOpen(true);
	};

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};

	const closePasswordModal = () => {
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

							<input type="password" placeholder="Mot de passe actuel" />
							<input type="password" placeholder="Nouveau mot de passe" />
							<input type="password" placeholder="Confirmer le mot de passe" />
							<button className="modal-button">Confirmer</button>
							<button className="modal-link" onClick={closePasswordModal}>
								Annuler
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
							<button className="window-button">Confirmer</button>
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
