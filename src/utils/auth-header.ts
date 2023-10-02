export const authHeader = () => {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	const token = user.token || '';
	if (token && user) {
		return { Authorization: `Bearer ${token}` };
	} else {
		return {};
	}
};
