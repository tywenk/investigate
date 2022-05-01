const Button = ({ children, customOnClick }) => {
	return (
		<button
			className='rounded-full bg-green-300 px-2 py-1 m-1'
			onClick={customOnClick}
		>
			{children}
		</button>
	)
}

export default Button
