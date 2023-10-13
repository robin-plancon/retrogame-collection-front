import './NotFound.scss';

import React from 'react';

import notFoundImage from '../../assets/NotFound/404.gif';

const NotFoundPage = () => {
	return (
		<div className="not-found-container">
			<img src={notFoundImage} alt="Page non trouvée" className="not-found-image" />
		</div>
	);
};

export default NotFoundPage;
