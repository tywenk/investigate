const AddNoteButton = ({ children, onCustomClick }) => {
	return (
		<button
			className='hover:bg-secondaryHover hover:border-blue-400 border  m-0.5 p-2 rounded-md'
			onClick={onCustomClick}
		>
			{children}
		</button>
	)
}

export default AddNoteButton
