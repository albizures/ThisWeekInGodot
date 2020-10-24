import React from 'react';

interface InputProps {
	type?: string;
	name: string;
	id: string;
	required?: boolean;
	placeholder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const { type = 'text', name, required = false, id, placeholder } = props;
		return (
			<div className="mt-1 relative rounded-md shadow-sm">
				<input
					className="appearance-none border border-gray-400 px-3 py-2 rounded focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
					type={type}
					ref={ref}
					id={id}
					required
					name={name}
					placeholder={placeholder}
				/>
			</div>
		);
	},
);

interface LabelProps {
	htmlFor: string;
}

export const Label: React.FC<LabelProps> = (props) => {
	const { children, htmlFor } = props;
	return (
		<label
			className="block text-base font-bold leading-5 text-gray-700"
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
};
