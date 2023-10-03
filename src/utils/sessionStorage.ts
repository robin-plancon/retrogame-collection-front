interface User {
	nickname: string;
	email: string;
}

// loadState function will load the state from the sessionStorage
export const loadState = () => {
	try {
		const user = sessionStorage.getItem('user');
		const token = sessionStorage.getItem('token');
		if (user === null || token === null) {
			return undefined;
		}
		const userResult = JSON.parse(user);
		const tokenResult = token;
		return { user: userResult, token: tokenResult };
	} catch (err) {
		return undefined;
	}
};

// saveState function will save the state in the sessionStorage
export const saveState = (user: User | null, token: string) => {
	try {
		const userResult = JSON.stringify(user);
		const tokenResult = token;
		sessionStorage.setItem('user', userResult);
		sessionStorage.setItem('token', tokenResult);
	} catch (err) {
		console.log(err);
	}
};
