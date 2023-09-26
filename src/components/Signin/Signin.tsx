import './Signin.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

type FormProps = {
	email?: string;
	password?: string;
};

function Signin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FormProps> = (data, event) => {
		if (event) {
			event.preventDefault();
		}
		console.log(JSON.stringify(data));
	};

	return (
		<div className="signin">
			<h1 className="signin-title">Connexion</h1>
			<form className="signup-title" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email" className="signin-label">
					Email
				</label>
			</form>
		</div>
	);
}

export default Signin;
