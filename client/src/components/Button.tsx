import React from 'react';

export const Button: React.FC<any> = ({ text, color, onClick }) => (
	<button
		onClick={onClick}
		type='button'
		className={`inline-block px-6 py-2.5 border-2 border-${color} text-${color} font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
		data-mdb-ripple='true'
		data-mdb-ripple-color='light'
	>
		{text}
	</button>
);
