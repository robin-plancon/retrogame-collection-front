import './NotFound.scss';

import React, { useEffect, useState } from 'react';

import errorGif from '../../assets/NotFound/404.gif';
import notFound from '../../assets/NotFound/notfound.jpg';
import errorPage from '../../assets/NotFound/notfound1.jpeg';

const images = {
	notFound: notFound,
	error: errorGif,
	errorPage: errorPage,
};

const getRandomImage = () => {
	const imageKeys = Object.keys(images);
	const randomIndex = Math.floor(Math.random() * imageKeys.length);
	return imageKeys[randomIndex];
};

const NotFoundPage = () => {
	const [randomImage, setRandomImage] = useState(getRandomImage());

	useEffect(() => {
		setRandomImage(getRandomImage());
	}, []);

	return (
		<div className="not-found-container">
			<img src={images[randomImage]} alt="Page non trouvée" className="not-found-image" />
		</div>
	);
};

export default NotFoundPage;
