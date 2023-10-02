interface User {
	nickname: string;
	email: string;
}

// loadState function will load the state from the localStorage
export const loadState = () => {
	try {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		if (user === null || token === null) {
			return undefined;
		}
		const userResult = JSON.parse(user);
		const tokenResult = JSON.parse(token);
		return { user: userResult, token: tokenResult };
	} catch (err) {
		return undefined;
	}
};

// saveState function will save the state in the localStorage
export const saveState = (user: User | null, token: string) => {
	try {
		const userResult = JSON.stringify(user);
		const tokenResult = JSON.stringify(token);
		localStorage.setItem('user', userResult);
		localStorage.setItem('token', tokenResult);
	} catch (err) {
		console.log(err);
	}
};
