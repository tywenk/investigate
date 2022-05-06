const Button = ({ children, customOnClick }) => {
	return (
		<button
			className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1'
			onClick={customOnClick}
		>
			{children}
		</button>
	)
}

export default Button
