import './styles/index.scss';

// import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import store from './store';

// // Firebase configuration
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
