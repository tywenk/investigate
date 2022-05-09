const Button = ({ children, customOnClick }) => {
	return (
		<button
			className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-500 px-2 m-1 transition ease-in-out'
			onClick={customOnClick}
		>
			{children}
		</button>
	)
}

export default Button
