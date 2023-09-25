import React from 'react';

interface InputProps {
	className?: string;
	type: string;
	id: string;
	name: string;
	label?: string;
}

function Input({ className, type, id, name, label }: InputProps) {
	return (
		<>
			{label && (
				<label htmlFor={id} className={`${className}-label`}>
					{label}
				</label>
			)}
			<input type={type} id={id} name={name} className={`${className}-input`} />
		</>
	);
}

export default Input;
